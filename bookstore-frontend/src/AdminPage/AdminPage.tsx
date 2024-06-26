import BooksTable from "./AdminBooksTable";
import Book from "../models/Book";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import Pagination from 'react-bootstrap/Pagination';
import { useState } from "react";
import AddBookModal from "./AddBookModal";
import styles from "./AdminPage.module.css"
import EditBookModal from "./EditBookModal";

interface Props {
    books: Book[];
    currPage: number;
    setBookOrder: (order: string) => void;
    addBook: (book: Book) => Promise<void>;
    deleteBook: (bookId: string) => Promise<void>;
    editBook: (book: Book) => Promise<void>;
    setSearchQuery: (string: string) => void;
    setCurrPage: (page: number) => void;
}

const AdminPage = ({books, currPage, setBookOrder, addBook, deleteBook, editBook, setSearchQuery, setCurrPage}: Props) => {
    const [showAddBookModal, setShowAddBookModal] = useState<boolean>(false);
    const [showEditBookModal, setShowEditBookModal] = useState<boolean>(false);
    const [searchBarVal, setSearchBarVal] = useState<string>("");
    const [bookToEdit, setBookToEdit] = useState<Book>({
        bookName: "",
        price: 0,
        author: "",
        category: "",
        quantity: 0
    });

    const handleEditBook = (book: Book) => {
        setBookToEdit(book);
        setShowEditBookModal(true);
    }

    const onSearchValChange = (e: any) => {
        setSearchBarVal(e.target.value);
    }

    const handleSearchSubmit = () => {
        setSearchQuery(searchBarVal);
    }

    const onEnterPress = (e: any) => {
        if (e.key == "Enter") {
            handleSearchSubmit();
            e.preventDefault();
        }
    }

    const onPrevPagePress = () => {
        if (currPage > 1) {
            setCurrPage(currPage - 1);
        }
    }

    const onNextPagePress = () => {
        if (books.length == 10) {
            setCurrPage(currPage + 1);
        }
    }

    return <div className={styles.root}>
        <div className={styles.content}>
            <div className={styles.tableHeader}>
                <Button
                    onClick={() => setShowAddBookModal(true)}
                    className={styles.addButton}
                    >Add Book</Button>
                <AddBookModal show={showAddBookModal} onHideModal={() => setShowAddBookModal(false)} handleSubmit={addBook} />
                <Form className={styles.searchbar}>
                  <Form.Control
                    name="search"
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={onSearchValChange}
                    onKeyDown={onEnterPress}

                  />
                  <Button variant="outline-success" onClick={handleSearchSubmit}>Search</Button>
                </Form>
            </div>
            <EditBookModal show={showEditBookModal} bookToEdit={bookToEdit} onHideModal={() => setShowEditBookModal(false)} handleSubmit={editBook}/>
            <BooksTable books={books} handleBookOrderChange={setBookOrder} handleDeleteBook={deleteBook} handleEditBookClick={handleEditBook}/>
            <div className={styles.tableFooter}>
                <Pagination>
                    <Pagination.Prev onClick={onPrevPagePress} />
                    <Pagination.Next onClick={onNextPagePress} />
                </Pagination>
            
            </div>
        </div>
    </div>
}

export default AdminPage;