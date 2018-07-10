using System.Runtime.Serialization;
using TaskList.Infrastructure;

namespace TaskList.DataContracts
{
    [DataContract(Name = Constants.DataContracts.Error)]
    public class ApiErrorModel
    {
        [DataMember(Name = Constants.DataMembers.Message)]
        public string Message { get; set; }

        public ApiErrorModel(string message)
        {
            Message = message;
        }

    }
}
