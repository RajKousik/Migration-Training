using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TodoAPI.DTOs.Todos;
using TodoAPI.Interfaces.Service;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{
    [ApiController]
    [Route("api/v1/todos")]
    public class TodosController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodosController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTodo([FromBody] AddTodoDTO addTodoDTO)
        {
            var createdTodo = await _todoService.CreateTodoAsync(addTodoDTO);
            return CreatedAtAction(nameof(GetTodoById), new { todoId = createdTodo.TodoId }, createdTodo);
        }

        [HttpGet("{todoId}")]
        public async Task<IActionResult> GetTodoById(int todoId)
        {
            var todo = await _todoService.GetTodoByIdAsync(todoId);
            if (todo == null)
                return NotFound("Todo not found");

            return Ok(todo);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTodos()
        {
            var todos = await _todoService.GetAllTodosAsync();
            return Ok(todos);
        }

        [HttpPut("{todoId}")]
        public async Task<IActionResult> UpdateTodo(int todoId, [FromBody] UpdateTodoDTO updateTodoDTO)
        {
            var updatedTodo = await _todoService.UpdateTodoAsync(todoId, updateTodoDTO);
            if (updatedTodo == null)
                return NotFound("Todo not found");

            return Ok(updatedTodo);
        }

        [HttpDelete("{todoId}")]
        public async Task<IActionResult> DeleteTodo(int todoId)
        {
            var deletedTodo = await _todoService.DeleteTodoAsync(todoId);
            if (deletedTodo == null)
                return NotFound("Todo not found");

            return NoContent();
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetTodosByUserId(int userId)
        {
            var todos = await _todoService.GetTodosByUserIdAsync(userId);
            if (todos == null || !todos.Any())
                return NotFound("No todos found for the user");

            return Ok(todos);
        }

        [HttpDelete("user/{userId}")]
        public async Task<IActionResult> DeleteTodosByUserId(int userId)
        {
            var result = await _todoService.DeleteTodosByUserIdAsync(userId);
            if (!result)
                return NotFound("No todos found for the user");

            return NoContent();
        }
    }
}
