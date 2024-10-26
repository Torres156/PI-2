import { useEffect } from 'react'
import { Layout } from '../includes/layout'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export function ListLoans () {
  
  const tooltipDevolver = (
    <Tooltip id="tooltip">
      Devolver
    </Tooltip>
  );

  return (
    <Layout>
      <div className='card'>
        <div className='card-content p-4'>
          <h3>Listagem de Empréstimos</h3>
          <hr />
          <div className='row gap-2 mt-4 justify-content-end'>
            <a
              href='/admin/student/create'
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
                    <button className='btn btn-primary p-2' style={{  color:"white", fontSize: "14px", fontWeight: "bold" }}>
                        <i className='bi bi-arrow-down-right-circle'></i>
                    </button>
                  </OverlayTrigger>
                    <button className='btn btn-danger p-2 mx-1' style={{  color:"white", fontSize: "14px", fontWeight: "bold" }}>
                        <i className='bi bi-trash'></i>
                    </button>
                </td>
              </tr>             
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
