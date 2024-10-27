import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap'
import './layout.css'

export function LayoutSite ( { menu = 'home', children}) {
  const bgStyle = {
    backgroundImage: `url('/assets/home-bg.jpg')`,
    filter: 'blur(4px)',
    scale: '1.1',
    position: 'fixed',
    height: '100%',
    backgroundSize: 'cover',
    zIndex: 0
  }

  return (
    <main className='vw-100 vh-100 bg-dark d-flex row m-0' style={{ flexDirection: 'column' }}>
      <style>
        {`
          .navbar-custom {
            height: 80px; /* Altura padrão */
          }

          @media (max-width: 991px) {
            .navbar-custom {
              height: 170px;
            }
          }
        `}
      </style>
      <div style={bgStyle}></div>

      <Navbar bg='dark' variant='dark' expand='lg' className='justify-content-center navbar-custom' >
        <Container>
          <NavbarBrand href='/'><img src='/assets/logo.png' width={150} /></NavbarBrand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='m-auto'>
              <Nav.Link className={menu === 'home' ? 'text-white' : ''} href='/'>Home</Nav.Link>
              <Nav.Link className={menu === 'galeria' ? 'text-white' : ''} href='/galeria'>Galeria</Nav.Link>              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <div style={{ zIndex: 1 }}>
        {children}
      </div>
    </main>
  )
}
