using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TodoAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }

        [Required]
        [JsonIgnore]
        public byte[] PasswordHash { get; set; }

        [Required]
        [JsonIgnore]
        public byte[] PasswordHashKey { get; set; }

        // Navigation property for Todos
        public ICollection<Todo> Todos { get; set; } = new List<Todo>();
    }
}
