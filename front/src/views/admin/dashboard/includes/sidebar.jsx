import { ButtonToolbar, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap"
import Logo from "../../../../assets/Logo.png"

export function Menu ({children}) {
  return (
    <Container fluid>
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <a
              href='/'
              className='d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none'
            >
              <span className='fs-5 d-none d-sm-inline'><img src={Logo} className="w-100"></img> </span>
            </a>
            <ul
              className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'
              id='menu'
            >           
              <li>
                <a
                  href='/admin/dashboard'
                  data-bs-toggle='collapse'
                  className='nav-link px-0 align-middle'
                >
                  <i className='fs-4 bi bi-house'></i>{' '}
                  <span className='ms-1 d-none d-sm-inline'>Dashboard</span>{' '}
                </a>                
              </li>
              <li>
                <a href='/admin/student' className='nav-link px-0 align-middle'>
                  <i className='fs-4 bi bi-person-badge-fill'></i>{' '}
                  <span className='ms-1 d-none d-sm-inline'>Alunos</span>
                </a>
              </li>
              <li>
                <a
                  href='/admin/books'
                  data-bs-toggle='collapse'
                  className='nav-link px-0 align-middle '
                >
                  <i className='fs-4 bi bi-book-half'></i>{' '}
                  <span className='ms-1 d-none d-sm-inline'>Livros</span>
                </a>                
              </li>

              <li>
                <a
                  href='/admin/loans'
                  data-bs-toggle='collapse'
                  className='nav-link px-0 align-middle '
                >
                  <i className='fs-4 bi bi-journal-check'></i>{' '}
                  <span className='ms-1 d-none d-sm-inline'>Empréstimos</span>
                </a>                
              </li>

              <li>
                <a
                  href='/admin/users'
                  data-bs-toggle='collapse'
                  className='nav-link px-0 align-middle '
                >
                  <i className='fs-4 bi bi-person'></i>{' '}
                  <span className='ms-1 d-none d-sm-inline'>Usuários</span>
                </a>                
              </li>
              
            </ul>
            <hr />            
            <Dropdown className='dropdown pb-4'>
              <DropdownToggle                
                className='d-flex align-items-center text-white text-decoration-none'                
                variant="primary"
                style={{ background: "none", border: "none" }}
              >
                <div style={{ width: "30px", height: "30px", backgroundColor: "white" }} className="rounded-circle d-flex justify-content-center">
                  <span className="text-center m-auto" style={{ color: "black" }}><b>A</b></span>
                </div>
                <span className='d-none d-sm-inline mx-1'>Administrador</span>
              </DropdownToggle>   

              <DropdownMenu>
                <DropdownItem>Sair</DropdownItem>
              </DropdownMenu>        
            </Dropdown>     

          </div>
        </div>
        <div className='col py-3 bg-white'>{children}</div>
      </div>
      </Container>
  )
}
