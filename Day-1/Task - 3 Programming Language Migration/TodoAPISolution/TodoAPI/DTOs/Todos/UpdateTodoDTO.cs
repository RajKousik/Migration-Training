using TodoAPI.Models.Enums;

namespace TodoAPI.DTOs.Todos
{
    public class UpdateTodoDTO
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime TargetDate { get; set; }

        public TodoStatus TodoStatus { get; set; }
    }
}
