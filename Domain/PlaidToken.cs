using System;

namespace Domain;

public class PlaidToken
{
    public Guid Id { get; set; }
    public string MemberId { get; set; }
    public string ItemId { get; set; }
    public string AccessToken { get; set; }
}
