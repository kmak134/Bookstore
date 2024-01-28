import styles from "./App.module.css"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"

interface Props {
    
}

const AppHeader = ({}: Props) => {

    const getNavbarClasses = () => {
        let classes = [];
        classes.push(styles.navbar);
        classes.push("bg-body-tertiary");
        return classes.join(" ");
    }

    return <Navbar bg="#a6acb3" expand="lg" className={getNavbarClasses()}>
    <Container>
      <Navbar.Brand href="#home">Bookstore</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export default AppHeader;