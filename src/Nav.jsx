import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navv() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary margin">
      <Container>
        <Navbar.Brand href="">Data Managemant</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Container>
    </Navbar>
  );
}

export default Navv;