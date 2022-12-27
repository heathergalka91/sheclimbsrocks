using System.Threading.Tasks;
using API.Controllers;
using Application.Plaid;
using Microsoft.AspNetCore.Mvc;

namespace API.Core.Plaid;

public class PlaidController : BaseAPIController
{
  [AllowAnonymous]
  [HttpPost]
  public async Task<IActionResult> LinkToken()
  {
    return HandleResult(await Mediator.Send(new LinkToken.Query()));
  }

  [AllowAnonymous]
  [HttpPost("accessToken")]
  public async Task<IActionResult> AccessToken(PlaidDto request) =>
      HandleResult(await Mediator.Send(new AccessToken.Command() { PublicToken = request.PublicToken }));
}

