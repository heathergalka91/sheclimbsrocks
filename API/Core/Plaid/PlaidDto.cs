using System.Text.Json.Serialization;

namespace API.Core.Plaid;

public class PlaidDto
{
    [JsonPropertyName("public_token")]
    public string PublicToken { get; set; }
}
