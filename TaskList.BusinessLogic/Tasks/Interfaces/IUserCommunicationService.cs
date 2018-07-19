using System.Threading.Tasks;
using TaskList.BusinessLogic.Tasks.Models;

namespace TaskList.BusinessLogic.Tasks.Interfaces
{
    public interface IUserCommunicationService
    {
        Task NotifyTaskAdded(TaskModel task);

        Task NotifyTaskUpdated(TaskModel task);

        Task NotifyTaskDeleted(TaskModel task);
    }
}
