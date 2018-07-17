using Microsoft.AspNet.OData.Builder;
using Microsoft.OData.Edm;
using System;
using TaskList.DataContracts;

namespace TaskList.Infrastructure
{
    public static class ODataConfig
    {
        public static IEdmModel BuildEdmModel(IServiceProvider serviceProvider)
        {
            var builder = new ODataConventionModelBuilder(serviceProvider);

            builder.EntitySet<TaskResource>("Task")
                .EntityType
                .Filter()
                .Count()
                .OrderBy()
                .Page();

            return builder.GetEdmModel();
        }
    }
}
