using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public LibraryController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        //Get Request to get all the Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Library>>> GetBooks()
        {
            if (_applicationDbContext.Books == null)
            {
                return NotFound();
            }
            return await _applicationDbContext.Books.ToListAsync();
        }

        //Get request to get a book using id

        [HttpGet("{id}")]
        public async Task<ActionResult<Library>> GetBook(int id)
        {
            if (_applicationDbContext.Books == null)
            {
                return NotFound();
            }
            var book = await _applicationDbContext.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return book;
        }

        //Post request to Create a Book
        [HttpPost]
        public async Task<ActionResult<Library>> PostBook(Library library)
        {
            _applicationDbContext.Books.Add(library);
            await _applicationDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBook), new {id = library.Id}, library);
        }

        //Put request to Update a Book
        [HttpPut("{id}")]
        public async Task<ActionResult> PutBook(int id, Library library)
        {
            if (id != library.Id)
            {
                return BadRequest();
            }
            _applicationDbContext.Entry(library).State = EntityState.Modified;
            try
            {
                await _applicationDbContext.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();

        }

        //Delete request to delete a Book
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBook(int id)
        {
            if(_applicationDbContext.Books == null)
            {
                return NotFound();
            }
            var book = await _applicationDbContext.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            _applicationDbContext.Books.Remove(book);
            await _applicationDbContext.SaveChangesAsync();

            return Ok();

        }

    }
}
