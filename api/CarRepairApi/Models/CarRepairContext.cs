using Microsoft.EntityFrameworkCore;

namespace CarRepairApi.Models
{
    public class CarRepairContext : DbContext
    {
        public DbSet<CarRepair> CarRepairs { get; set; } = null!;

        public CarRepairContext(DbContextOptions<CarRepairContext> options) : base(options) { }
    }
}
