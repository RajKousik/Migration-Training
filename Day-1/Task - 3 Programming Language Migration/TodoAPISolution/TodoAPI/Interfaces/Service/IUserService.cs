using TodoAPI.DTOs.Users;
using TodoAPI.Models;

namespace TodoAPI.Interfaces.Service
{
    public interface IUserService
    {
        public Task<User> Login (LoginDTO loginDTO);
        public Task<User> Register (RegisterDTO registerDTO);
    }
}
