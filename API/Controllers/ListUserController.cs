using System.Collections.Generic;
using System.Threading.Tasks;
using Application.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListUserController : BaseController
    {

        [HttpGet]
        public async Task<ActionResult<List<User>>> UserList()
        {
            return await Mediator.Send(new UserList.Query());
        }

        
    }
}