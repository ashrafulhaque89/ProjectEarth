using System;
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
        private readonly IMediator _mediator;
        public ListUserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> UserList()
        {
            return await Mediator.Send(new UserList.Query());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(String id)
        {
            return await _mediator.Send(new DeleteUser.Command{id = id});
        }

        
    }
}