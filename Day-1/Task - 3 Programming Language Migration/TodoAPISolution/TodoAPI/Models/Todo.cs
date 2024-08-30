using System.ComponentModel.DataAnnotations.Schema;
using TodoAPI.Models.Enums;

namespace TodoAPI.Models
{
    public class Todo
    {
        public int TodoId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int UserId {  get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        public DateTime TargetDate { get; set; }

        public TodoStatus TodoStatus {  get; set; } 


    }
}
