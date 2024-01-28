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

  useEffect(() => {
    getBooks();
  }, []);

  const addBook = async(book: Book) => {
    try {
      await axios.post(BASE_URL, book);
      getBooks();
    } catch (e) {
      console.log('Error in addBook: ', e)
    }
  }

  const getBooks = async() => {
    try {
      const { data } = await axios.get(`${BASE_URL}`);
      setBooks(data);
    } catch (e) {
      console.log('Error in getBooks: ', e);
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
    <AdminPage books={books} addBook={addBook} deleteBook={deleteBook} editBook={editBook}/>
  </div>
}

export default App;
