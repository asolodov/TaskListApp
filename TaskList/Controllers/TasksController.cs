using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskList.DataContracts;

namespace TaskList.Controllers
{
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        [HttpGet]
        public Response<IEnumerable<Task>> Get()
        {
            return new Response<IEnumerable<Task>>(new[]
            {
                new Task()
                {
                    Name="Test",
                    Description="desc",
                    Priority = 2,
                    Status = Status.Active,
                    DateAdded = DateTime.Now
                },
                new Task()
                {
                    Name="Test",
                    Description="desc",
                    Priority = 2,
                    Status = Status.Active,
                    DateAdded = DateTime.Now
                }
            });
        }

        [HttpPost]
        public void Post([FromBody] Task task)
        {

        }
    }
}
