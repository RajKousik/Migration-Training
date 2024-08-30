using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoAPI.DTOs.Todos;
using TodoAPI.Interfaces.Repository;
using TodoAPI.Interfaces.Service;
using TodoAPI.Models;

namespace TodoAPI.Services
{
    public class TodoService : ITodoService
    {
        private readonly IRepository<int, Todo> _todoRepository;

        public TodoService(IRepository<int, Todo> todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<Todo> CreateTodoAsync(AddTodoDTO addTodoDTO)
        {
            var todo = new Todo
            {
                Title = addTodoDTO.Title,
                Description = addTodoDTO.Description,
                UserId = addTodoDTO.UserId,
                TargetDate = addTodoDTO.TargetDate,
                TodoStatus = addTodoDTO.TodoStatus
            };

            return await _todoRepository.Add(todo);
        }

        public async Task<Todo> UpdateTodoAsync(int todoId, UpdateTodoDTO updateTodoDTO)
        {
            var todo = await _todoRepository.GetById(todoId);
            if (todo == null)
                return null;

            todo.Title = updateTodoDTO.Title;
            todo.Description = updateTodoDTO.Description;
            todo.TargetDate = updateTodoDTO.TargetDate;
            todo.TodoStatus = updateTodoDTO.TodoStatus;

            return await _todoRepository.Update(todo);
        }

        public async Task<Todo> GetTodoByIdAsync(int todoId)
        {
            return await _todoRepository.GetById(todoId);
        }

        public async Task<IEnumerable<Todo>> GetAllTodosAsync()
        {
            return await _todoRepository.GetAll();
        }

        public async Task<bool> DeleteTodoAsync(int todoId)
        {
            var todo = await _todoRepository.GetById(todoId);
            if (todo == null)
                return false;

            await _todoRepository.Delete(todoId);
            return true;
        }

        public async Task<IEnumerable<Todo>> GetTodosByUserIdAsync(int userId)
        {
            var todos = await _todoRepository.GetAll();
            return todos.Where(t => t.UserId == userId);
        }

        public async Task<bool> DeleteTodosByUserIdAsync(int userId)
        {
            var todos = await _todoRepository.GetAll();
            var userTodos = todos.Where(t => t.UserId == userId).ToList();

            if (!userTodos.Any())
                return false;

            foreach (var todo in userTodos)
            {
                await _todoRepository.Delete(todo.TodoId);
            }

            return true;
        }
    }
}
