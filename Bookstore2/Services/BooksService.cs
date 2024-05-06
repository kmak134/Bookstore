using Bookstore2.Database.Models;
using Bookstore2.Database;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Bookstore2.Services
{
    public class BooksService
    {
        private readonly IMongoCollection<Book> _books;
        private const int pageSize = 10;

        public BooksService(IOptions<BookstoreDatabaseSettings> bookStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(
            bookStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                bookStoreDatabaseSettings.Value.DatabaseName);

            _books = mongoDatabase.GetCollection<Book>(
                bookStoreDatabaseSettings.Value.BookstoreCollectionName);
        }

        public async Task AddBook(Book book)
        {
            await _books.InsertOneAsync(book);
        }

        public async Task RemoveBook(string id)
        {
            await _books.DeleteOneAsync(book => book.Id == id);
        }

        public async Task<Book?> GetBook(string id)
        {
            return await _books.Find(book => book.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<Book>> GetBooks(int pageIndex, string? searchString)
        {
            var books = await _books.Find(book => true).ToListAsync();
            if (!string.IsNullOrEmpty(searchString))
            {
                return books.Where(b => b.BookName.Contains(searchString, StringComparison.OrdinalIgnoreCase) ||
                                    b.Author.Contains(searchString, StringComparison.OrdinalIgnoreCase) || 
                                    b.Category.Contains(searchString, StringComparison.OrdinalIgnoreCase))
                    .OrderByDescending(book => book.Id).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            }
            return books.OrderByDescending(book => book.Id).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();         
        }

        public async Task UpdateBook(string Id, Book updatedBook)
        {
            await _books.ReplaceOneAsync(b => b.Id == Id, updatedBook);
        }

        public async Task<List<Book>> GetSortedBooks(string sortedOrder, int pageIndex, string? searchString)
        {
            var books = await _books.Find(book => true).ToListAsync();
            if (!string.IsNullOrEmpty(searchString))
            {
                books = books.Where(b => b.BookName.Contains(searchString, StringComparison.OrdinalIgnoreCase) ||
                                    b.Author.Contains(searchString, StringComparison.OrdinalIgnoreCase) ||
                                    b.Category.Contains(searchString, StringComparison.OrdinalIgnoreCase)).ToList();
            }
      
            switch (sortedOrder)
            {
                case "name":
                    return books.OrderBy(book => book.BookName).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                case "name_desc":
                    return books.OrderByDescending(book => book.BookName).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                case "author":
                    return books.OrderBy(book => book.Author).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                case "author_desc":
                    return books.OrderByDescending(book => book.Author).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                case "price":
                    return books.OrderBy(book => book.Price).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                case "price_desc":
                    return books.OrderByDescending(book => book.Price).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                case "category":
                    return books.OrderBy(book => book.Category).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                case "category_desc":
                    return books.OrderByDescending(book => book.Category).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                case "quantity":
                    return books.OrderBy(book => book.Quantity).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                case "quantity_desc":
                    return books.OrderByDescending(book => book.Quantity).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                default:
                    return books.OrderBy(book => book.BookName).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            }
        }


    }
}
