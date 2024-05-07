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
  const [searchString, setSearchString] = useState<string>("");
  const [currIndex, setCurrIndex] = useState<number>(1);

  useEffect(() => {
    getBooks(1);
  }, []);

  useEffect(() => {
    setCurrIndex(1);
    if (sortOrder !== "") {
      if (searchString !== "") {
        getSortedBooks(sortOrder, 1, searchString);
      } else {
        getSortedBooks(sortOrder, 1);
      }
    }
  }, [sortOrder]);

  useEffect(() => {
    setCurrIndex(1);
    setSortOrder("");
    if (sortOrder !== "") {
      getSortedBooks(sortOrder, 1, searchString);
    } else {
      getBooks(1, searchString);
    }
  }, [searchString])

  useEffect(() => {
    if (currIndex > 0) {
      if (sortOrder !== "") {
        getSortedBooks(sortOrder, currIndex, searchString);
      } else {
        getBooks(currIndex, searchString);
      }
    }
  }, [currIndex])

  const addBook = async(book: Book) => {
    try {
      await axios.post(BASE_URL, book);
      setSortOrder("");
      setSearchString("");
      setCurrIndex(1);
      getBooks(1);
    } catch (e) {
      console.log('Error in addBook: ', e)
    }
  }

  const getBooks = async(pageIndex: number, searchString?: string) => {
    try {
      if (searchString !== "") {
        const { data } = await axios.get(`${BASE_URL}/${pageIndex}`, {params: {searchString: searchString}});
        setBooks(data);
      } else {
        const { data } = await axios.get(`${BASE_URL}/${pageIndex}`);
        setBooks(data);
      }
    } catch (e) {
      console.log('Error in getBooks: ', e);
    } 
  }

  const getSortedBooks = async(sortOrder: string, pageIndex: number, searchString?: string) => {
    try {
      if (sortOrder !== "") {
        if (searchString !== "") {
          const { data } = await axios.get(`${BASE_URL}/${sortOrder}/${pageIndex}`, {params: {searchString: searchString}});
          setBooks(data);
        } else {
          const { data } = await axios.get(`${BASE_URL}/${sortOrder}/${pageIndex}`);
          setBooks(data);
        }
      } else {
        getBooks(pageIndex, searchString);
      }
    } catch (e) {
      console.log('Error in getSortedBooks: ', e);
    }
  }

  const editBook = async(book: Book) => {
    try {
      await axios.put(`${BASE_URL}/${book.id}`, book);
      getSortedBooks(sortOrder, currIndex, searchString);
    } catch (e) {
      console.log('Error in editBook: ', e);
    }
  }

  const deleteBook = async(bookId: string) => {
    try {
      await axios.delete(`${BASE_URL}/${bookId}`);
      getBooks(1);
    } catch (e) {
      console.log('Error in deleteBook: ', e);
    }
  }

  return <div className="app-container">
    <AppHeader />
    <AdminPage books={books} 
      currPage={currIndex} 
      setBookOrder={setSortOrder} 
      addBook={addBook} 
      deleteBook={deleteBook} 
      editBook={editBook} 
      setSearchQuery={setSearchString} 
      setCurrPage={setCurrIndex}
    />
  </div>
}

export default App;
