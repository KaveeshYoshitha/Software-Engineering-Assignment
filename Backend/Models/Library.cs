using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Library
    {
        //define the field 
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public String Title { get; set; }

        [Required]
        [MaxLength(50)]
        public String Author { get; set; }

        [Required]
        [MaxLength(500)]
        public String Description { get; set; }
    }
}
