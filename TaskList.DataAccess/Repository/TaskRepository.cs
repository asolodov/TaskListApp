using TaskList.BusinessLogic.Tasks.Interfaces;
using TaskList.BusinessLogic.Tasks.Models;

namespace TaskList.DataAccess.Repository
{
    public class TaskRepository : BaseRepository<int, Task>, ITaskRepository
    {
        public TaskRepository(TaskListDbContext dbContext)
              : base(dbContext)
        {
        }
    }
}
