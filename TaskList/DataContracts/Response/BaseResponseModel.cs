using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using TaskList.Infrastructure;

namespace TaskList.DataContracts.Response
{
    [DataContract(Name = Constants.DataContracts.Response)]
    public class BaseResponseModel
    {
        [DataMember(Name = Constants.DataMembers.Errors, Order = 1)]
        public IEnumerable<ApiErrorModel> Errors { get; set; }
    }
}
