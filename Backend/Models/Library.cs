using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Library
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public String Title { get; set; }

        [Required]
        public String Author { get; set; }

        [Required]
        public String Description { get; set; }
    }
}
