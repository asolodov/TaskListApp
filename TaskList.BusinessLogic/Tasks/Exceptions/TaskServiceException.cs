using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace TaskList.BusinessLogic.Tasks.Exceptions
{
    [Serializable]
    public class TaskServiceException : Exception
    {
        public TaskServiceException()
        {
        }

        public TaskServiceException(string message) : base(message)
        {
        }

        public TaskServiceException(string message, Exception inner) : base(message, inner)
        {
        }

        protected TaskServiceException(
            SerializationInfo info,
            StreamingContext context) : base(info, context)
        {
        }
    }
}
