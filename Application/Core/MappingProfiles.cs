using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Core
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<AppUser, Profiles.ProfileDto>()
        .ForMember(a => a.Image, o => o
          .MapFrom(s => s.Photos
            .FirstOrDefault(x => x.IsMain).Url));
    }
  }
}