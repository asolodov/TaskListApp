using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskList.BusinessLogic.Tasks.Interfaces;
using TaskList.DataContracts;
using TaskList.DataContracts.Response;

namespace TaskList.Controllers
{
    [ODataRoutePrefix("api/Task]")]
    public class TaskController : Controller
    {
        private readonly ITaskService _taskService;
        private static List<BusinessLogic.Tasks.Models.Task> tasksStatic = new List<BusinessLogic.Tasks.Models.Task>();

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;

            if (tasksStatic.Count>0)
            {
                return;
            }
            for (int i = 0; i < 100000; i++)
            {
                tasksStatic.Add(new BusinessLogic.Tasks.Models.Task()
                {
                    Id = i,
                    Name = "asd",
                    DateAdded = DateTime.Now,
                    TimeToComplete = DateTime.Now.AddDays(1),
                    Status = i % 2 == 0 ? BusinessLogic.Tasks.Models.Status.Active : BusinessLogic.Tasks.Models.Status.Completed,
                    Priority = 100,
                    Description = "123"
                });
            }
        }

        [HttpGet]
        [EnableQuery]
        public IActionResult Get(/*ODataQueryOptions<Task> query*/)
        {
            return Ok(_taskService.GetTasks().ProjectTo<Task>());
            //return Ok(tasksStatic.AsQueryable().ProjectTo<Task>());
        }


        [HttpPost]
        public ActionResult Post([FromBody] Task task)
        {
            var blTask = Mapper.Map<BusinessLogic.Tasks.Models.Task>(task);
            _taskService.CreateTask(blTask);
            return Ok();
        }

        [HttpPatch]
        [ODataRoute("({key})")]
        public ActionResult Patch([FromODataUri]int key, [FromBody] Task task)
        {
            var blTask = Mapper.Map<BusinessLogic.Tasks.Models.Task>(task);
            blTask.Id = key;
            _taskService.UpdateTask(blTask);
            return Ok();
        }

        [HttpDelete]
        [ODataRoute("({key})")]
        public ActionResult Delete([FromODataUri]int key)
        {
            _taskService.DeleteTask(key);
            return Ok();
        }
    }
}
