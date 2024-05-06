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

        [HttpGet("{pageIndex}")]
        public async Task<List<Book>> GetBooks(int pageIndex, string? searchString)
        {
            return await _booksService.GetBooks(pageIndex, searchString);
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

        [HttpGet("{sortOrder}/{pageIndex}", Name = "GetSortedBooks")]
        public async Task<List<Book>> GetSortedBooks(string sortOrder, int pageIndex, string? searchString)
        {
            return await _booksService.GetSortedBooks(sortOrder, pageIndex, searchString);
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
