using System.Runtime.Serialization;
using TaskList.Infrastructure;

namespace TaskList.DataContracts
{
    [DataContract(Name = Constants.DataContracts.Status)]
    public enum Status
    {
        Active = 0,
        Completed = 1
    }
}
