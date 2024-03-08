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
      <Navbar.Brand href="#home">Bookstore Inventory Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Container>
  </Navbar>
}

export default AppHeader;