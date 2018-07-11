using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Models = TaskList.BusinessLogic.Tasks.Models;

namespace TaskList.Hubs
{
    public class TaskHub : Hub
    {
        public async Task AddTask(Models.TaskModel task)
        {
            var contract = Mapper.Map<DataContracts.TaskResource>(task);
            await Clients.All.SendAsync(nameof(AddTask), contract);
        }

        public async Task UpdateTask(Models.TaskModel task)
        {
            var contract = Mapper.Map<DataContracts.TaskResource>(task);
            await Clients.All.SendAsync(nameof(UpdateTask), contract);
        }
    }
}
