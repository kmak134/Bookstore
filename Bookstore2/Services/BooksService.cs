using Bookstore2.Database.Models;
using Bookstore2.Database;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Bookstore2.Services
{
    public class BooksService
    {
        private readonly IMongoCollection<Book> _books;

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

        public async Task<List<Book>> GetBooks()
        {
            return await _books.Find(book => true).ToListAsync();
        }

        public async Task UpdateBook(string Id, Book updatedBook)
        {
            await _books.ReplaceOneAsync(b => b.Id == Id, updatedBook);
        }


    }
}
