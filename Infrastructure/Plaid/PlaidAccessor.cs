using Application.Interfaces;
using Going.Plaid;
using Going.Plaid.Accounts;
using Going.Plaid.Entity;
using Going.Plaid.Item;
using Microsoft.Extensions.Options;

namespace Infrastructure.Plaid;

public class PlaidAccessor : IBankAccessor
{
  private readonly PlaidClient _plaidClient;
  private readonly PlaidSettings _config;

  public PlaidAccessor(IOptions<PlaidSettings> config)
  {
    _config = config.Value;
    _plaidClient = new PlaidClient(Going.Plaid.Environment.Sandbox);
  }

  public async Task<string> CreateLinkTokenAsync()
  {
    var result = await _plaidClient.LinkTokenCreateAsync(
        new Going.Plaid.Link.LinkTokenCreateRequest()
        {
          ClientId = _config.ClientId,
          Secret = _config.Secret,
          Language = Language.English,
          CountryCodes = "US,CA".Split(',').Select(p => Enum.Parse<CountryCode>(p, true)).ToArray(),
          ClientName = "sheclimbsrocks",
          User = new LinkTokenCreateRequestUser { ClientUserId = Guid.NewGuid().ToString() },
          Products = "auth,identity,transactions".Split(",").Select(p => Enum.Parse<Products>(p, true)).ToArray()
        });


    return result.IsSuccessStatusCode ? result.LinkToken : result.Error?.ErrorMessage ?? "";
  }

  public async Task<(string, string)> GetAccessTokenAsync(string publicToken)
  {
    var result = await _plaidClient.ItemPublicTokenExchangeAsync(new ItemPublicTokenExchangeRequest(){
        ClientId = _config.ClientId,
        Secret = _config.Secret,
        PublicToken = publicToken
    });

    return result.IsSuccessStatusCode ? (result.AccessToken, result.ItemId) : ("", "");
  }
}
