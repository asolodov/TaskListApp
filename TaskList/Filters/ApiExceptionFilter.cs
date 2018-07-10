using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using TaskList.BusinessLogic.Tasks.Exceptions;
using TaskList.DataContracts;
using TaskList.DataContracts.Response;

namespace TaskList.Filters
{
    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        private readonly ILogger _logger;

        public ApiExceptionFilter(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger(typeof(ApiExceptionFilter));
        }

        public override void OnException(ExceptionContext context)
        {
            if (context.ExceptionHandled)
                return;

            var exc = context.Exception;
            if (exc == null)
                return;

            var errors = new List<ApiErrorModel>();
            var aggregateException = exc as AggregateException;

            if (aggregateException == null)
            {
                errors.Add(GetError(exc));
            }
            else
            {
                errors.AddRange(aggregateException.InnerExceptions.Select(GetError));
            }

            context.Result = new ObjectResult(new BaseResponseModel()
            {
                Errors = errors
            })
            {
                StatusCode = (int) HttpStatusCode.InternalServerError
            };
        }

        private ApiErrorModel GetError(Exception ex)
        {
            switch (ex)
            {
                case ArgumentException argumentException:
                case TaskServiceException taskServiceException:
                {
                    return CreateAndLogError(ex.Message, ex);
                }
                default:
                {
                    return CreateAndLogError("Unhandled inner exception occured", ex);
                }
            }
        }

        private ApiErrorModel CreateAndLogError(string message, Exception ex)
        {
            _logger.LogError(new EventId(), ex, message);
            return new ApiErrorModel(message);
        }
    }
}
