using System.Threading.Tasks;

namespace Application.Interfaces;

public interface IBankAccessor
{
    Task<string> CreateLinkTokenAsync();
    Task<(string, string)> GetAccessTokenAsync(string publicToken);

}