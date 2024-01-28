import BooksTable from "./AdminBooksTable";
import Book from "../models/Book";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { useState } from "react";
import AddBookModal from "./AddBookModal";
import styles from "./AdminPage.module.css"
import EditBookModal from "./EditBookModal";

interface Props {
    books: Book[];
    addBook: (book: Book) => Promise<void>
    deleteBook: (bookId: string) => Promise<void>
    editBook: (book: Book) => Promise<void>
}

const AdminPage = ({books, addBook, deleteBook, editBook}: Props) => {
    const [showAddBookModal, setShowAddBookModal] = useState<boolean>(false);
    const [showEditBookModal, setShowEditBookModal] = useState<boolean>(false);
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

    return <div className={styles.root}>
        <div className={styles.content}>
            <div className={styles.tableHeader}>
                <Button
                    onClick={() => setShowAddBookModal(true)}
                    className={styles.addButton}
                    >Add Book</Button>
                <AddBookModal show={showAddBookModal} onHideModal={() => setShowAddBookModal(false)} handleSubmit={addBook} />
            </div>
            <EditBookModal show={showEditBookModal} bookToEdit={bookToEdit} onHideModal={() => setShowEditBookModal(false)} handleSubmit={editBook}/>
            <BooksTable books={books} handleDeleteBook={deleteBook} handleEditBookClick={handleEditBook}/>
        </div>
    </div>
}

export default AdminPage;