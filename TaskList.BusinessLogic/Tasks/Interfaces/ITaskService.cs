using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TaskList.BusinessLogic.Tasks.Models;

namespace TaskList.BusinessLogic.Tasks.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskModel>> GetTasks();

        Task CreateTask(TaskModel task);

        Task UpdateTask(TaskModel task);

        Task DeleteTask(int id);
    }
}
