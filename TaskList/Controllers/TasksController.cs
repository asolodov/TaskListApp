using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskList.BusinessLogic.Tasks.Interfaces;
using TaskList.DataContracts;

namespace TaskList.Controllers
{
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public Response<IEnumerable<Task>> Get()
        {
            var tasks = _taskService.GetTasks().Select(t => Mapper.Map<Task>(t));
            return new Response<IEnumerable<Task>>(tasks);
        }

        [HttpPost]
        public void Post([FromBody] Task task)
        {
            if (ModelState.IsValid)
            {
                var blTask = Mapper.Map<BusinessLogic.Tasks.Models.Task>(task);
                _taskService.CreateTask(blTask);
            }
        }
    }
}
