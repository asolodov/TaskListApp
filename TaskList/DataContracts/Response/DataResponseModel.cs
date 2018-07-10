using System.Collections.Generic;
using System.Runtime.Serialization;
using TaskList.DataContracts.Response;
using TaskList.Infrastructure;

namespace TaskList.DataContracts
{
    [DataContract(Name = Constants.DataContracts.Response)]
    public class DataResponseModel<T> : BaseResponseModel
    {
        [DataMember(Name = Constants.DataMembers.Data, Order = 0)]
        public T Data { get; set; }

        public DataResponseModel(T data)
        {
            Data = data;
        }
    }
}
