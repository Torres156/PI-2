using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BibliotecaLegal.App.Actions;

public class AuthorizationAction : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var token = context.HttpContext.Request.Headers.Authorization.FirstOrDefault();
        if (token == null)
        {
            var action = new ContentResult();
            action.Content = "Você não está autenticado!";
            action.StatusCode = (int)HttpStatusCode.Unauthorized;
            context.Result = action;
            return;
        }
        
        base.OnActionExecuting(context);
    }
}