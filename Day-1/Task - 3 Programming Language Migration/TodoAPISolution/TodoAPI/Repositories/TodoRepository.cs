using TodoAPI.Interfaces.Repository;
using TodoAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace TodoAPI.Repositories
{
    public class TodoRepository : IRepository<int, Todo>
    {
        private readonly TodoContext _context;

        public TodoRepository(TodoContext context)
        {
            _context = context;
        }

        public async Task<Todo> Add(Todo todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return todo;
        }

        public async Task<Todo> Delete(int todoId)
        {
            var todo = await _context.Todos.FindAsync(todoId);
            if (todo == null)
            {
                return null;
            }

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            return todo;
        }

        public async Task<Todo> Update(Todo todo)
        {
            var existingTodo = await _context.Todos.FindAsync(todo.TodoId);
            if (existingTodo == null)
            {
                return null;
            }

            _context.Entry(existingTodo).CurrentValues.SetValues(todo);
            await _context.SaveChangesAsync();
            return todo;
        }

        public async Task<Todo> GetById(int todoId)
        {
            return await _context.Todos.FindAsync(todoId);
        }

        public async Task<IEnumerable<Todo>> GetAll()
        {
            return await _context.Todos.ToListAsync();
        }
    }
}
