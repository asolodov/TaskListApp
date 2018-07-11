using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskList.BusinessLogic.Tasks.Interfaces;
using TaskList.BusinessLogic.Tasks.Models;
using TaskList.DataContracts;
using TaskList.DataContracts.Response;

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
        public async Task<DataResponseModel<IEnumerable<TaskResource>>> Get()
        {
            var tasks = (await _taskService.GetTasks()).Select(t => Mapper.Map<TaskResource>(t));
            return new DataResponseModel<IEnumerable<TaskResource>>(tasks);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TaskResource task)
        {
            var blTask = Mapper.Map<TaskModel>(task);
            await _taskService.CreateTask(blTask);
            return Ok();
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] TaskResource task)
        {
            var blTask = Mapper.Map<TaskModel>(task);
            blTask.Id = id;
            await _taskService.UpdateTask(blTask);
            return Ok();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _taskService.DeleteTask(id);
            return Ok();
        }

    }
}
