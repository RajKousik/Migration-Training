using System.Runtime.Serialization;

namespace TodoAPI.Exceptions
{
    [Serializable]
    public class UserAlreadyExistException : Exception
    {
        private string msg;
        public UserAlreadyExistException()
        {
            msg = "User with similiar Name already exists";
        }

        public UserAlreadyExistException(string message) : base(message)
        {
            msg = message;
        }

        public override string Message => msg;

    }
}