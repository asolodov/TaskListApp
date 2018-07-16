using Microsoft.AspNet.OData.Builder;
using Microsoft.OData.Edm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskList.Infrastructure
{
    public static class ODataConfig
    {
        public static IEdmModel BuildEdmModel(IServiceProvider serviceProvider)
        {
            var builder = new ODataConventionModelBuilder(serviceProvider);

            builder.EntitySet<DataContracts.Task>(nameof(DataContracts.Task))
                .EntityType
                .Filter()
                .Count()
                .OrderBy()
                .Page();

            return builder.GetEdmModel();
        }
    }
}
