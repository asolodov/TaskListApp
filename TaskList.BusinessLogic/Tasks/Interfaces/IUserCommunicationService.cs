using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TaskList.BusinessLogic.Tasks.Interfaces
{
    public interface IUserCommunicationService
    {
        Task NotifyTaskAdded(Models.TaskModel task);
        Task NotifyTaskUpdated(Models.TaskModel task);
        Task NotifyTaskDeleted(Models.TaskModel task);
    }
}
