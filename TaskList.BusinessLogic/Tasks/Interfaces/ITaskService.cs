using System.Linq;
using TaskList.BusinessLogic.Tasks.Models;

namespace TaskList.BusinessLogic.Tasks.Interfaces
{
    public interface ITaskService
    {
        IQueryable<Task> GetTasks();

        void CreateTask(Task task);

        void UpdateTask(Task task);

        void DeleteTask(int id);
    }
}
