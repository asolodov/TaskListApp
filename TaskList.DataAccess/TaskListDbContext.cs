using Microsoft.EntityFrameworkCore;
using TaskList.BusinessLogic.Tasks.Models;
using TaskList.DataAccess.DataMappings;

namespace TaskList.DataAccess
{
    public class TaskListDbContext : DbContext
    {
        public DbSet<TaskModel> Tasks { get; set; }

        public TaskListDbContext(DbContextOptions<TaskListDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new TasksEntityTypeConfiguration());
        }

    }
}
