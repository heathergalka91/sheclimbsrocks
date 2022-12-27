using System.Text.Json.Serialization;

namespace Application.Plaid;

public class PlaidResponse
{
  [JsonPropertyName("link_token")]
  public string LinkToken { get; set; }
  [JsonPropertyName("access_token")]
  public string AccessToken { get; set; }
}
