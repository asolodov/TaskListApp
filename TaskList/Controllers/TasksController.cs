using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TaskList.BusinessLogic.Tasks.Interfaces;
using TaskList.BusinessLogic.Tasks.Models;
using TaskList.DataContracts;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace TaskList.Controllers
{
    [ODataRoutePrefix("api/Task")]
    public class TaskController : Controller
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult> Get(ODataQueryOptions<TaskResource> query)
        {
            var filteredQuery = query.ApplyTo(_taskService.GetTasks().ProjectTo<TaskResource>());
            return Ok(await filteredQuery.Cast<TaskResource>().ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TaskResource task)
        {
            var blTask = Mapper.Map<TaskModel>(task);
            await _taskService.CreateTask(blTask);
            return Ok();
        }

        [HttpPatch]
        [ODataRoute("({key})")]
        public async Task<ActionResult> Patch([FromODataUri]int key, [FromBody] TaskResource task)
        {
            var blTask = Mapper.Map<TaskModel>(task);
            blTask.Id = key;
            await _taskService.UpdateTask(blTask);
            return Ok();
        }

        [HttpDelete]
        [ODataRoute("({key})")]
        public async Task<ActionResult> Delete([FromODataUri]int key)
        {
            await _taskService.DeleteTask(key);
            return Ok();
        }
    }
}
