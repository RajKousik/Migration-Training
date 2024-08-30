using System.Collections.Generic;
using System.Threading.Tasks;
using TodoAPI.DTOs.Todos;
using TodoAPI.Models;

namespace TodoAPI.Interfaces.Service
{
    public interface ITodoService
    {
        Task<Todo> CreateTodoAsync(AddTodoDTO addTodoDTO);
        Task<Todo> UpdateTodoAsync(int todoId, UpdateTodoDTO updateTodoDTO);
        Task<Todo> GetTodoByIdAsync(int todoId);
        Task<IEnumerable<Todo>> GetAllTodosAsync();
        Task<bool> DeleteTodoAsync(int todoId);
        Task<IEnumerable<Todo>> GetTodosByUserIdAsync(int userId);
        Task<bool> DeleteTodosByUserIdAsync(int userId);
    }
}
