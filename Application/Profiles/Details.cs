using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles 
{
  public class Details
  {
    public class Query : IRequest<Result<ProfileDto>>
    {
      public string Email { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<ProfileDto>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
    private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
      {
      _userAccessor = userAccessor;
        _mapper = mapper;
        _context = context;
      }

      public async Task<Result<ProfileDto>> Handle(Query request, CancellationToken cancellationToken)
      {
        var user = await _context.Users
            .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider, new {username = _userAccessor.GetUsername()})
            .SingleOrDefaultAsync(f => f.Email == request.Email);

        if (user == null) return null;
        return Result<ProfileDto>.Success(user);
      }
    }
  }
}