﻿using System;
using System.Collections.Generic;
using System.Text;
using TaskList.BusinessLogic.Tasks.Models;

namespace TaskList.BusinessLogic.Tasks.Interfaces
{
    public interface ITaskRepository : IBaseRepository<int, TaskModel>
    {
    }
}
