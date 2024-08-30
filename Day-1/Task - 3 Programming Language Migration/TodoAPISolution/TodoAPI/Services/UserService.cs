using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TodoAPI.DTOs.Users;
using TodoAPI.Exceptions;
using TodoAPI.Interfaces.Repository;
using TodoAPI.Interfaces.Service;
using TodoAPI.Models;

namespace TodoAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<int, User> _userRepository;

        public UserService(IRepository<int, User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> Login(LoginDTO loginDTO)
        {
            // Find the user by username (assuming UserName is unique)
            var userDB = await _userRepository.GetAll();
            var user = userDB.FirstOrDefault(u => u.UserName == loginDTO.UserName);

            if (user == null)
                return null; // User not found

            using (var hMACSHA = new HMACSHA512(user.PasswordHashKey))
            {
                var computedHash = hMACSHA.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

                // Compare the computed hash with the stored hash
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != user.PasswordHash[i])
                        return null; // Password mismatch
                }
            }

            return user; // Successful login
        }

        public async Task<User> Register(RegisterDTO registerDTO)
        {
            using var hMACSHA = new HMACSHA512();

            var usersDB = await _userRepository.GetAll();
            var userExists = usersDB.FirstOrDefault(u => u.UserName == registerDTO.UserName);

            if(userExists != null)
            {
                throw new UserAlreadyExistException("User Already Exists");
            }

            var user = new User
            {
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,
                UserName = registerDTO.UserName,
                PasswordHash = hMACSHA.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordHashKey = hMACSHA.Key
            };

            // Add the new user to the database
            var registeredUser = await _userRepository.Add(user);
            return registeredUser;
        }
    }
}
