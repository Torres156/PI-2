import { Col, Container, Nav, Navbar, NavbarBrand, Row } from 'react-bootstrap'
import './layout.css'
import { useEffect } from 'react'

export function LayoutSite ({ children, menu = 'home' }) {
  useEffect(() => {
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflowX = 'auto'
    }
  }, [])

  const bgStyle = {
    backgroundImage: `url('/assets/home-bg.jpg')`,
    filter: 'blur(4px)',
    scale: '1.1',
    position: 'fixed',
    height: '100%',
    backgroundSize: 'cover',
    zIndex: 0
  }

  const footerContainerStyle = {
    padding: '16px',
    borderRadius: '30px',
    backgroundColor: 'white'
  }

  return (
    <>
      <main
        className='vw-100 vh-100 bg-dark d-flex row m-0'
        style={{ flexDirection: 'row' }}
      >
        <div style={bgStyle}></div>

        <Navbar
          variant='dark'
          expand='lg'
          className='w-100 justify-content-center navbar-custom'
        >
          <Container>
            <NavbarBrand href='/'>
              <img src='/assets/logo-white.png' width={150} />
            </NavbarBrand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='m-auto'>
                <Nav.Link
                  className={menu === 'home' ? 'text-white' : ''}
                  href='/'
                >
                  <strong>Home</strong>
                </Nav.Link>
                <Nav.Link
                  className={menu === 'galeria' ? 'text-white' : ''}
                  href='/galeria'
                >
                  <strong>Galeria</strong>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className='p-0' style={{ zIndex: 1 }}>
          {children}
        </div>
      

      <footer className='d-flex p-0' style={{ flexDirection: 'column', marginTop: '150px' }}>
        <div className='w-100 footer-container'>
          <Container className='p-0' style={{ zIndex: 1 }}>
            <div style={footerContainerStyle}>
              <h2 className='text-center mt-4'>
                <strong>Empreste já</strong> um livro!
              </h2>

              <Row style={{ margin: 'auto', marginTop: '50px' }}>
                <Col className='text-center'>
                  <h2>
                    <i class='bi bi-telephone'></i>
                  </h2>
                  <h2>Telefone</h2>
                  (99) 99999-9999 <br />
                  (99) 9999-9999
                </Col>
                <Col className='text-center'>
                  <h2>
                    <i class='bi bi-geo-alt'></i>
                  </h2>
                  <h2>Localização</h2>
                  Biblioteca, próxima a diretoria
                </Col>
                <Col className='text-center'>
                  <h2>
                    <i class='bi bi-alarm-fill'></i>
                  </h2>
                  <h2>Atendimento</h2>
                  (9:00 ÁS 11:00/14:00 ÁS 16:00)
                </Col>
                <Col className='text-center'>
                  <h2>
                    <i class='bi bi-envelope-fill'></i>
                  </h2>
                  <h2>E-mail</h2>
                  biblioteca@escola.com
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        <div className='background-primary w-100' style={{ padding: '3rem 0', zIndex:1 }}>
          <Container>
            <Row className='gap-4'>
              <Col className='gap-4'>
                <img src='/assets/logo-white.png' width={150} />
                <img src='/assets/univesp.webp' width={150} />
              </Col>
              <Col
                className='d-flex justify-content-center'
                style={{
                  color: 'white',
                  flexDirection: 'column',
                  alignItems: 'flex-end'
                }}
              >
                <p>
                  <strong>Desenvolvido por: </strong> Grupo 006
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
      </main>
    </>
  )
}
