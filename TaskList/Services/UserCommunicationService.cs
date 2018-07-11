using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskList.BusinessLogic.Tasks.Interfaces;
using TaskList.Hubs;
using Models = TaskList.BusinessLogic.Tasks.Models;

namespace TaskList.Services
{
    public class UserCommunicationService : IUserCommunicationService
    {
        private readonly IHubContext<TaskHub> _hubContext;

        public UserCommunicationService(IHubContext<TaskHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task NotifyTaskAdded(Models.TaskModel task)
        {
            if (task == null)
                throw new ArgumentNullException(nameof(task));

            var contract = Mapper.Map<DataContracts.TaskResource>(task);
            await _hubContext.Clients.All.SendAsync("TaskAdded", contract);
        }

        public async Task NotifyTaskUpdated(Models.TaskModel task)
        {
            if (task == null)
                throw new ArgumentNullException(nameof(task));

            var contract = Mapper.Map<DataContracts.TaskResource>(task);
            await _hubContext.Clients.All.SendAsync("TaskUpdated", contract);
        }

        public async Task NotifyTaskDeleted(Models.TaskModel task)
        {
            if (task == null)
                throw new ArgumentNullException(nameof(task));

            var contract = Mapper.Map<DataContracts.TaskResource>(task);
            await _hubContext.Clients.All.SendAsync("TaskDeleted", contract);
        }
    }
}
