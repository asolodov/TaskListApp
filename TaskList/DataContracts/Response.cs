using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskList.DataContracts
{
    public class Response<T>
    {
        public T Data { get; set; }
        public Error Error { get; set; }

        public Response(T data)
        {
            Data = data;
        }
    }
}
