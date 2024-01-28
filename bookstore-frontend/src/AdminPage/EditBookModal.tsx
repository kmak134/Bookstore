import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button, Modal} from 'react-bootstrap';
import Book from '../models/Book';

import { FormEventHandler, useState, useEffect } from 'react';

interface Props {
    show: boolean,
    bookToEdit: Book,
    onHideModal: () => void,
    handleSubmit: (book: Book) => Promise<void>
}

const EditBookModal = ({show, bookToEdit, onHideModal, handleSubmit}: Props) => {
    const [bookData, setBookData] = useState<Book>({
        bookName: bookToEdit.bookName,
        price: bookToEdit.price,
        author: bookToEdit.author,
        category: bookToEdit.category,
        quantity: bookToEdit.quantity
    });

    const [validated, setValidated] = useState<boolean>(false);

    useEffect(() => {
        setBookData(bookToEdit);
    }, [bookToEdit]);

    const resetForm = () => {
        setBookData({
            bookName: "",
            price: 0,
            author: "",
            category: "",
            quantity: 0
        });
        setValidated(false);
    }

    const onFormChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setBookData({ ...bookData, [name]: value });
    }

    const handleOnHide = () => {
        onHideModal();
        resetForm();
    }

    const submitHandler: FormEventHandler = (event) => {
        event.preventDefault();
        event.persist();
        handleSubmit(bookData);
        setValidated(true);
        handleOnHide();
    }
        
    return <Modal
    show={show}
    onHide={onHideModal}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Book
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form validated={validated}>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="addBookName">
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control name="bookName" onChange={onFormChange} value={bookData.bookName} type="text"/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="addAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control name="author" onChange={onFormChange} value={bookData.author} type="text"/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="addCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control name="category" onChange={onFormChange} value={bookData.category} type="text"/>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="addPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" onChange={onFormChange} value={bookData.price} type="number"/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="addQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control name="quantity" onChange={onFormChange} value={bookData.quantity} type="number"/>
                    </Form.Group>
                </Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={submitHandler}>Edit Book</Button>
        </Modal.Footer>
  </Modal>
  
}

export default EditBookModal;