using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using TaskList.BusinessLogic.Tasks.Interfaces;
using TaskList.DataContracts;

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
        public ActionResult Get(ODataQueryOptions<Task> query)
        {
            var filteredQuery = query.ApplyTo(_taskService.GetTasks().ProjectTo<Task>());
            return Ok(filteredQuery);
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
