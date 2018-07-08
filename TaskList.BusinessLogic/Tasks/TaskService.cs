using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TaskList.BusinessLogic.Tasks.Interfaces;
using TaskList.BusinessLogic.Tasks.Models;

namespace TaskList.BusinessLogic.Tasks
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public IEnumerable<Task> GetTasks()
        {
            return _taskRepository.Get().ToList();
        }

        public void CreateTask(Task task)
        {
            if (task == null)
                throw new ArgumentNullException(nameof(task));

            task.DateAdded = DateTime.Now;

            _taskRepository.Add(task);
            _taskRepository.SaveChanges();
        }

        public void UpdateTask(Task task)
        {
            if (task == null)
                throw new ArgumentNullException(nameof(task));

            _taskRepository.Update(task);
            _taskRepository.SaveChanges();
        }

        public void DeleteTask(int id)
        {
            if (id <= 0)
                throw new ArgumentOutOfRangeException(nameof(id));

            var task = _taskRepository.GetById(id);
            if (task != null)
            {
                _taskRepository.Delete(task);
                _taskRepository.SaveChanges();
            }
        }
    }
}
