using TodoAPI.Models.Enums;

namespace TodoAPI.DTOs.Todos
{
    public class AddTodoDTO
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public int UserId { get; set; }

        public DateTime TargetDate { get; set; }

        public TodoStatus TodoStatus { get; set; }
    }
}
