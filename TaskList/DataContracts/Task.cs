﻿using System;
using System.Runtime.Serialization;
using TaskList.Infrastructure;

namespace TaskList.DataContracts
{
    [DataContract(Name = Constants.DataContracts.Task)]
    public class Task
    {
        [DataMember(Name = Constants.DataMembers.Id)]
        public int Id { get; set; }

        [DataMember(Name = Constants.DataMembers.Name)]
        public string Name { get; set; }

        [DataMember(Name = Constants.DataMembers.Description)]
        public string Description { get; set; }

        [DataMember(Name = Constants.DataMembers.Status)]
        public Status Status { get; set; }

        [DataMember(Name = Constants.DataMembers.Priority)]
        public int Priority { get; set; }

        [DataMember(Name = Constants.DataMembers.DateAdded)]
        public DateTime? DateAdded { get; set; }

        [DataMember(Name = Constants.DataMembers.TimeToComplete)]
        public DateTime? TimeToComplete { get; set; }

    }
}