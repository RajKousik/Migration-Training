using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TodoAPI.DTOs.Users;
using TodoAPI.Interfaces.Service;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{
    [ApiController]
    [Route("api/v1/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            var user = await _userService.Register(registerDTO);
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var user = await _userService.Login(loginDTO);
            if (user == null)
                return Unauthorized("Invalid credentials");

            return Ok(user);
        }


    }
}
