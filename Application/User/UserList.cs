using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;

namespace Application.User
{
    public class UserList
    {
        public class Query : IRequest<List<User>> { }

       public class Handler : IRequestHandler<Query, List<User>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<User>> Handle(Query request, CancellationToken cancellationToken)
            {
               var userlist = (await _context.AppUsers.ToListAsync()).Select((u)=> {
                   return new User
                   {
                       Username = u.UserName,  
                       DisplayName = u.DisplayName
                   };
                   
               }).ToList();
               return userlist;
            }
        }
    }
}