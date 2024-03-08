using Bookstore2.Database.Models;
using Bookstore2.Services;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookstoreController : ControllerBase
    {
        private readonly BooksService _booksService;
        public BookstoreController(BooksService booksService)
        {
            _booksService = booksService;
        }

        [HttpGet()]
        public async Task<List<Book>> GetBooks(string? searchString)
        {
            return await _booksService.GetBooks(searchString);
        }

        [HttpGet("{id:length(24)}", Name = "GetBook")]
        public async Task<ActionResult<Book>> GetBook(string id)
        {
            var book = await _booksService.GetBook(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpGet("{sortOrder}", Name = "GetSortedBooks")]
        public async Task<List<Book>> GetSortedBooks(string sortOrder, string? searchString)
        {
            return await _booksService.GetSortedBooks(sortOrder, searchString);
        }


        [HttpPost]
        public async Task<IActionResult> AddBook(Book newBook)
        {
            await _booksService.AddBook(newBook);

            return CreatedAtRoute(nameof(GetBook), new { id = newBook.Id }, newBook);
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> DeleteBook(string id)
        {
            var book = await _booksService.GetBook(id);

            if (book == null)
            {
                return NotFound();
            }

            await _booksService.RemoveBook(id);

            return NoContent();
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> UpdateBook(string id, Book updatedBook)
        {
            var book = await _booksService.GetBook(id);

            if (book == null)
            {
                return NotFound();
            }

            await _booksService.UpdateBook(id, updatedBook);

            return NoContent();
        }
    }
}
