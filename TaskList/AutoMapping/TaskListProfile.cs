using AutoMapper;

namespace TaskList.AutoMapping
{
    public class TaskListProfile : Profile
    {
        public TaskListProfile()
        {
            CreateMap<BusinessLogic.Tasks.Models.Task, DataContracts.Task>()
                .ForMember(s => s.Status, opt => opt.MapFrom(d => (DataContracts.Status) d.Status))
                .ReverseMap();
            CreateMap<BusinessLogic.Tasks.Models.Status, DataContracts.Status>().ReverseMap();
        }
    }
}
