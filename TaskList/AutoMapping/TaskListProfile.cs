﻿using AutoMapper;
using TaskList.BusinessLogic.Tasks.Models;
using TaskList.DataContracts;

namespace TaskList.AutoMapping
{
    public class TaskListProfile : Profile
    {
        public TaskListProfile()
        {
            CreateMap<TaskModel, TaskResource>().ReverseMap();
            CreateMap<BusinessLogic.Tasks.Models.Status, DataContracts.Status>().ReverseMap();
        }
    }
}
