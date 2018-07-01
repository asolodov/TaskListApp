using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using TaskList.BusinessLogic.Tasks.Models;

namespace TaskList.DataAccess
{
    public class TaskListDbContext : DbContext
    {
        public DbSet<Task> Tasks { get; set; }

        public TaskListDbContext(DbContextOptions<TaskListDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}
