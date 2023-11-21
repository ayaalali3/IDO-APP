using Microsoft.EntityFrameworkCore;

namespace Testt_IDO.DATA
{
        public class MyAppDbContext: DbContext
        {
            public MyAppDbContext(DbContextOptions options) : base(options)
            {

            }
            public DbSet<User> Users { get; set; }
            public DbSet<ToDo> ToDos { get; set; }
    }
}
