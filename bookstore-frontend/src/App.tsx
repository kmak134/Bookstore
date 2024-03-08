import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";

import './App.css';
import axios from "axios";
import Book from './models/Book';
import AdminPage from './AdminPage/AdminPage';
import AppHeader from './components/AppHeader';



const App = () => {
  const BASE_URL = 'https://localhost:7235/api/Bookstore';
  const [books, setBooks] = useState<Book[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchString, setSearchString] = useState<string>('');

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    if (searchString) {
      getSortedBooks(sortOrder, searchString);
    } else {
      getSortedBooks(sortOrder);
    }
  }, [sortOrder]);

  useEffect(() => {
    if (sortOrder) {
      getSortedBooks(sortOrder, searchString);
    } else {
      getBooks(searchString);
    }
  }, [searchString])

  const addBook = async(book: Book) => {
    try {
      await axios.post(BASE_URL, book);
      getBooks();
    } catch (e) {
      console.log('Error in addBook: ', e)
    }
  }

  const getBooks = async(searchString?: string) => {
    try {
      if (searchString) {
        const { data } = await axios.get(`${BASE_URL}`, {params: {searchString: searchString}});
        setBooks(data);
      } else {
        const { data } = await axios.get(`${BASE_URL}`);
        setBooks(data);
      }
    } catch (e) {
      console.log('Error in getBooks: ', e);
    } 
  }

  const getSortedBooks = async(sortOrder: string, searchString?: string) => {
    try {
      if (searchString) {
        const { data } = await axios.get(`${BASE_URL}/${sortOrder}`, {params: {searchString: searchString}});
        setBooks(data);
      } else {
        const { data } = await axios.get(`${BASE_URL}/${sortOrder}`);
        setBooks(data);
      }
      
    } catch (e) {
      console.log('Error in getSortedBooks: ', e);
    }
  }

  const editBook = async(book: Book) => {
    try {
      await axios.put(`${BASE_URL}/${book.id}`, book);
      getBooks();
    } catch (e) {
      console.log('Error in editBook: ', e);
    }
  }

  const deleteBook = async(bookId: string) => {
    try {
      await axios.delete(`${BASE_URL}/${bookId}`);
      getBooks();
    } catch (e) {
      console.log('Error in deleteBook: ', e);
    }
  }

  return <div className="app-container">
    <AppHeader />
    <AdminPage books={books} setBookOrder={setSortOrder} addBook={addBook} deleteBook={deleteBook} editBook={editBook} setSearchQuery={setSearchString}/>
  </div>
}

export default App;
