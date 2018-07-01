using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskList.AutoMapping
{
    public class TaskListProfile : Profile
    {
        public TaskListProfile()
        {
            CreateMap<BusinessLogic.Tasks.Models.Task, DataContracts.Task>().ReverseMap();
            CreateMap<BusinessLogic.Tasks.Models.Status, DataContracts.Status>().ReverseMap();
        }
    }
}
