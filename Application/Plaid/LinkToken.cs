using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;

namespace Application.Plaid;

public class LinkToken
{
    public class Query : IRequest<Result<PlaidResponse>>
    {

    }

    public class Handler : IRequestHandler<Query, Result<PlaidResponse>>
    {
      private readonly IBankAccessor _bankAccessor;

      public Handler(IBankAccessor bankAccessor)
      {
        _bankAccessor = bankAccessor;
      }
      public async Task<Result<PlaidResponse>> Handle(Query request, CancellationToken cancellationToken)
      {
        var token = await _bankAccessor.CreateLinkTokenAsync();

        return string.IsNullOrWhiteSpace(token) ? 
          Result<PlaidResponse>.Failure("Error Generating Token, try again later") : 
          Result<PlaidResponse>.Success(new  PlaidResponse() {LinkToken = token});
      }
    }
  }
