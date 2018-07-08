using System;
using System.Collections.Generic;
using System.Text;
using TaskList.BusinessLogic.Tasks.Models;

namespace TaskList.BusinessLogic.Tasks.Interfaces
{
    public interface ITaskService
    {
        IEnumerable<Task> GetTasks();

        void CreateTask(Task task);

        void UpdateTask(Task task);

        void DeleteTask(int id);
    }
}
