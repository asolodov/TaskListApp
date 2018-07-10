using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskList.BusinessLogic.Tasks.Interfaces;
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
        public DataResponseModel<IEnumerable<Task>> Get()
        {
            var tasks = _taskService.GetTasks().Select(t => Mapper.Map<Task>(t));
            return new DataResponseModel<IEnumerable<Task>>(tasks);
        }

        [HttpPost]
        public ActionResult Post([FromBody] Task task)
        {
            var blTask = Mapper.Map<BusinessLogic.Tasks.Models.Task>(task);
            _taskService.CreateTask(blTask);
            return Ok();
        }

        [HttpPut]
        [Route("{id:int}")]
        public ActionResult Put(int id, [FromBody] Task task)
        {
            var blTask = Mapper.Map<BusinessLogic.Tasks.Models.Task>(task);
            blTask.Id = id;
            _taskService.UpdateTask(blTask);
            return Ok();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public ActionResult Delete(int id)
        {
            _taskService.DeleteTask(id);
            return Ok();
        }

    }
}
