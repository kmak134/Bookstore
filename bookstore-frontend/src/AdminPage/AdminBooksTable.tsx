import Table from "react-bootstrap/Table"
import Book from "../models/Book";
import styles from "./AdminPage.module.css"
import { Button } from "react-bootstrap";


interface Props {
    books: Book[],
    handleDeleteBook: (bookId: string) => Promise<void>
    handleEditBookClick: (book: Book) => void
}

const BooksTable = ({books, handleDeleteBook, handleEditBookClick}: Props) => {

  const handleDeleteClick = (id: string | undefined) => {
    if (id) handleDeleteBook(id);
    // replace with warning window later
    else console.log("error deleting item ", id);
  }

  return <Table className={styles.adminTable} hover>
    <thead>
      <tr>
        <th className={styles.addBorder}>Name</th>
        <th className={styles.addBorder}>Author</th>
        <th className={styles.addBorder}>Category</th>
        <th className={styles.addBorder}>Price</th>
        <th className={styles.buttonCell}></th>
        <th className={styles.buttonCell}></th>
      </tr>
    </thead>
    <tbody>
        {books.map((book) => 
        <tr key={book.id}>
            <td className={styles.addBorder}>{book.bookName}</td>
            <td className={styles.addBorder}>{book.author}</td>
            <td className={styles.addBorder}>{book.category}</td>
            <td className={styles.addBorder}>{book.price}</td>
            <td><Button variant="outline-warning" className = {styles.tableButton} onClick={() => handleEditBookClick(book)}>Edit</Button></td>
            <td><Button variant="outline-danger" className = {styles.tableButton} onClick={() => handleDeleteClick(book.id)}>Delete</Button></td>
        </tr>)}
    </tbody>
  </Table>
}

export default BooksTable;