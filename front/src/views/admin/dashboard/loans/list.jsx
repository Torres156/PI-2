import { useEffect, useState } from 'react'
import { Layout } from '../includes/layout'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import SweetAlert2 from 'react-sweetalert2';

export function ListLoans () {
  const [swalProps, setSwalProps] = useState({})

  const tooltipDevolver = (
    <Tooltip id="tooltip">
      Devolver
    </Tooltip>
  );

  const devolver = () =>
  {
     setSwalProps({
        show: true,
        html: 'Deseja realmente fazer a devolução?',
        title: 'Devolução',
        showCancelButton: true,
        icon: 'warning',        
        onResolve: (e) => {
          setSwalProps({}); 
          if (e.isConfirmed)
          {

          }
        }
      })
  }

  const excluir = () =>
    {
       setSwalProps({
          show: true,
          html: 'Deseja realmente excluir este empréstimo?',
          title: 'Excluir',
          showCancelButton: true,
          icon: 'warning',        
          onResolve: (e) => {
            setSwalProps({}); 
            if (e.isConfirmed)
            {
  
            }
          }
        })
    }

  return (
    <Layout>
      <div className='card'>
        <div className='card-content p-4'>
          <h3>Listagem de Empréstimos</h3>
          <hr />
          <div className='row gap-2 mt-4 justify-content-end'>
            <a
              href='/admin/loans/create'
              className='btn btn-primary'
              style={{ width: '150px', marginRight: '8px' }}
            >
              Novo
            </a>
          </div>

          <table class='table mt-4 table-striped table-bordered'>
            <thead>
              <tr className='table-dark'>
                <th scope='col'>#</th>
                <th scope='col'>Aluno</th>
                <th scope='col'>Livro</th>
                <th scope='col'>Status</th>
                <th scope='col'>Devolução</th>
                <th scope='col' style={{ width: "100px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>1</th>
                <td>Teste</td>
                <td>Teste</td>
                <td>Emprestado</td>
                <td>01/11/2024</td>
                <td className='d-flex justify-content-center'>
                  <OverlayTrigger placement="left" overlay={tooltipDevolver}>
                    <button className='btn btn-primary p-2' style={{  color:"white", fontSize: "14px", fontWeight: "bold" }} onClick={devolver}>
                        <i className='bi bi-arrow-down-right-circle'></i>
                    </button>
                  </OverlayTrigger>
                    <button className='btn btn-danger p-2 mx-1' style={{  color:"white", fontSize: "14px", fontWeight: "bold" }} onClick={excluir}>
                        <i className='bi bi-trash'></i>
                    </button>
                </td>
              </tr>             
            </tbody>
          </table>
        </div>
      </div>
      <SweetAlert2 {...swalProps} />
    </Layout>
  )
}
