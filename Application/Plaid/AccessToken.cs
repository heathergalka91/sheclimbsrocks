using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Plaid;

public class AccessToken
{
    public class Command : IRequest<Result<PlaidResponse>>
    {
      public string PublicToken { get; set; }
    }

  public class Handler : IRequestHandler<Command, Result<PlaidResponse>>
  {
    private readonly DataContext _context;
    private readonly IBankAccessor _bankAccessor;
    private readonly IUserAccessor _userAccessor;
    public Handler(DataContext context, IBankAccessor bankAccessor, IUserAccessor userAccessor)
    {
      _context = context;
      _bankAccessor = bankAccessor;
      _userAccessor = userAccessor;
    }
    public async Task<Result<PlaidResponse>> Handle(Command request, CancellationToken cancellationToken)
    {
      var (token, itemId) = await _bankAccessor.GetAccessTokenAsync(request.PublicToken);
      // var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

      // if(user == null) return null;

      
      var plaidToken = new PlaidToken {
        MemberId = "user.Id",
        AccessToken = token,
        ItemId = itemId,
      };

      _context.PlaidTokens.Add(plaidToken);
      var result = await _context.SaveChangesAsync() > 0;

      return !string.IsNullOrWhiteSpace(token) && result ?
        Result<PlaidResponse>.Success(new PlaidResponse() {AccessToken = token}) :
        Result<PlaidResponse>.Failure("Error generating Access Token, try again later"); 
        
    }
  }
}
