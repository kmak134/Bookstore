import Table from "react-bootstrap/Table"
import Book from "../models/Book";
import styles from "./AdminPage.module.css"
import { Button } from "react-bootstrap";
import { useState } from "react";
import sortAscArrow from "../images/caret-down.svg";
import sortDescArrow from "../images/caret-up.svg";


interface Props {
    books: Book[],
    handleBookOrderChange: (sortOrder: string) => void
    handleDeleteBook: (bookId: string) => Promise<void>
    handleEditBookClick: (book: Book) => void
}

const BooksTable = ({books, handleBookOrderChange, handleDeleteBook, handleEditBookClick}: Props) => {
  const [isNameDesc, setIsNameDesc] = useState<boolean>(true);
  const [isAuthorDesc, setIsAuthorDesc] = useState<boolean>(true);
  const [isCategoryDesc, setIsCategoryDesc] = useState<boolean>(true);
  const [isPriceDesc, setIsPriceDesc] = useState<boolean>(true);


  const handleDeleteClick = (id: string | undefined) => {
    if (id) handleDeleteBook(id);
    // replace with warning window later
    else console.log("error deleting item ", id);
  }

  const resetSortOrder = () => {
    setIsNameDesc(true);
    setIsAuthorDesc(true);
    setIsCategoryDesc(true);
    setIsPriceDesc(true);
  }

  const handleSortByNameClick = () => {
    let sortOrder = isNameDesc;
    if (isNameDesc) handleBookOrderChange('name');
    else handleBookOrderChange('name_desc');
    resetSortOrder();
    setIsNameDesc(!sortOrder);
  }

  const handleSortByAuthorClick = () => {
    let sortOrder = isAuthorDesc;
    if (isAuthorDesc) handleBookOrderChange('author');
    else handleBookOrderChange('author_desc');
    resetSortOrder();
    setIsAuthorDesc(!sortOrder);
  }

  const handleSortByCategoryClick = () => {
    let sortOrder = isCategoryDesc;
    if (isCategoryDesc) handleBookOrderChange('category');
    else handleBookOrderChange('category_desc');
    resetSortOrder();
    setIsCategoryDesc(!sortOrder);
  }

  const handleSortByPriceClick = () => {
    let sortOrder = isPriceDesc;
    if (isPriceDesc) handleBookOrderChange('price');
    else handleBookOrderChange('price_desc');
    resetSortOrder();
    setIsPriceDesc(!sortOrder);
  }

  return <Table className={styles.adminTable} hover>
    <thead>
      <tr>
        <th className={`${styles.addBorder} ${styles.headerCell}`} onClick={() => handleSortByNameClick()}>
          <div className={styles.headerCellDiv}>
            <img className={styles.sortArrow} src={isNameDesc ? sortAscArrow : sortDescArrow}/>
            Name
          </div>
        </th>
        <th className={`${styles.addBorder} ${styles.headerCell}`} onClick={() => handleSortByAuthorClick()}>
          <div className={styles.headerCellDiv}>
            <img className={styles.sortArrow} src={isAuthorDesc ? sortAscArrow : sortDescArrow}/>
            Author
          </div>
        </th>
        <th className={`${styles.addBorder} ${styles.headerCell}`} onClick={() => handleSortByCategoryClick()}>
          <div className={styles.headerCellDiv}>
            <img className={styles.sortArrow} src={isCategoryDesc ? sortAscArrow : sortDescArrow}/>
            Category
          </div>
        </th>
        <th className={`${styles.addBorder} ${styles.headerCell}`} onClick={() => handleSortByPriceClick()}>
          <div className={styles.headerCellDiv}>
            <img className={styles.sortArrow} src={isPriceDesc ? sortAscArrow : sortDescArrow}/>
            Price
          </div>
        </th>
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