using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
  public class DataContext : IdentityDbContext<AppUser>
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Photo> Photos { get; set; }
    public DbSet<PlaidToken> PlaidTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);
    }

  }
}