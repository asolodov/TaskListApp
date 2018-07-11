using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskList.BusinessLogic.Tasks.Exceptions;
using TaskList.BusinessLogic.Tasks.Interfaces;
using TaskList.BusinessLogic.Tasks.Models;

namespace TaskList.BusinessLogic.Tasks
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IUserCommunicationService _userCommunicationService;

        public TaskService(ITaskRepository taskRepository, IUserCommunicationService userCommunicationService)
        {
            _taskRepository = taskRepository;
            _userCommunicationService = userCommunicationService;
        }

        public async Task<IEnumerable<TaskModel>> GetTasks()
        {
            return await _taskRepository.GetAll();
        }

        public async Task CreateTask(TaskModel task)
        {
            if (task == null)
                throw new ArgumentNullException(nameof(task));

            task.DateAdded = DateTime.Now.ToUniversalTime();

            _taskRepository.Add(task);
            await _taskRepository.SaveChanges();

            await _userCommunicationService.NotifyTaskAdded(task);
        }

        public async Task UpdateTask(TaskModel task)
        {
            if (task == null)
                throw new ArgumentNullException(nameof(task));

            _taskRepository.Update(task);
            await _taskRepository.SaveChanges();
            await _userCommunicationService.NotifyTaskUpdated(task);
        }

        public async Task DeleteTask(int id)
        {
            if (id <= 0)
                throw new ArgumentOutOfRangeException(nameof(id));

            var task = await _taskRepository.GetById(id);
            if (task != null)
            {
                _taskRepository.Delete(task);
                await _taskRepository.SaveChanges();
                await _userCommunicationService.NotifyTaskDeleted(task);
            }
            else
            {
                throw new TaskServiceException($"Task with id {id} is not found");
            }
        }
    }
}
