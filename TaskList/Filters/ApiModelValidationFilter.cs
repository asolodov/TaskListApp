using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using TaskList.DataContracts;
using TaskList.DataContracts.Response;

namespace TaskList.Filters
{
    public class ApiModelValidationFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.ModelState.IsValid)
                return;

            context.Result = new BadRequestObjectResult(PrepareErrorResponse(context.ModelState));
        }

        private BaseResponseModel PrepareErrorResponse(ModelStateDictionary modelState)
        {
            var errors = modelState.Values.SelectMany(t => t.Errors).Select(t => new ApiErrorModel(t.ErrorMessage));
            return new BaseResponseModel()
            {
                Errors = errors
            };
        }
    }
}