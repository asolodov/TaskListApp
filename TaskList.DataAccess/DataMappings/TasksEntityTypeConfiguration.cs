using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskList.BusinessLogic.Tasks.Models;

namespace TaskList.DataAccess.DataMappings
{
    internal class TasksEntityTypeConfiguration : IEntityTypeConfiguration<TaskModel>
    {
        public void Configure(EntityTypeBuilder<TaskModel> builder)
        {
            builder.ToTable("Tasks");
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Name).IsRequired();
            builder.Property(t => t.Priority).IsRequired();
            builder.Property(t => t.Status).IsRequired();
            builder.Property(t => t.DateAdded).IsRequired();
            builder.Property(t => t.TimeToComplete).IsRequired();
        }
    }
}
