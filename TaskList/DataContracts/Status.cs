using System.Runtime.Serialization;
using TaskList.Infrastructure;

namespace TaskList.DataContracts
{
    [DataContract(Name = Constants.DataContracts.Status)]
    public enum Status
    {
        [EnumMember(Value = "Active")]
        Active = 0,
        [EnumMember(Value = "Completed")]
        Completed = 1
    }
}
