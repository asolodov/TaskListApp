using System;

namespace TaskList.BusinessLogic.Tasks.Models
{
    public class Task
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Status Status { get; set; }

        public int Priority { get; set; }

        public DateTime DateAdded { get; set; }

        public DateTime TimeToComplete { get; set; }
    }
}
