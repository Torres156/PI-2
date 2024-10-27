import { Card, Col, Row } from 'react-bootstrap'
import { Layout } from './includes/layout'
import SweetAlert2 from 'react-sweetalert2'
import { useEffect } from 'react'
import { useState } from 'react'

export function AdminDashboard () {
  const [swalProps, setSwalProps] = useState({})

    useEffect(() => {
        setSwalProps({
            show: true,
            html: 'Existem alguns alunos atrasados para devolução de livro.',
            title: '',            
            icon: 'error',        
            onResolve: (e) => {
              setSwalProps({}); 
              if (e.isConfirmed)
              {
    
              }
            }
          })
    }, [])

  return (
    <Layout>
      <div className='card h-100'>
        <div className='card-content p-4 h-100 d-flex flex-column'>
          <h3>Início</h3>
          <hr />
          <table
            className='table mt-4 table-striped table-bordered'
            style={{ maxHeight: '460px' }}
          >
            <thead>
              <tr className='table-dark'>
                <th scope='col'>Livro</th>
                <th scope='col'>Aluno</th>
                <th scope='col'>Sala</th>
                <th scope='col'>Empréstimo</th>
                <th scope='col'>Devolução</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='text-danger'>Sono Pesado</td>
                <td className='text-danger'>Teste</td>
                <td className='text-danger'>1ª Sala - A</td>
                <td className='text-danger'>01/10/2024</td>
                <td className='text-danger'>30/10/2024</td>
              </tr>

              <tr>
                <td>Sono Pesado</td>
                <td>Teste</td>
                <td>1ª Sala - A</td>
                <td>01/10/2024</td>
                <td>30/10/2024</td>
              </tr>

              <tr>
                <td>Sono Pesado</td>
                <td>Teste</td>
                <td>1ª Sala - A</td>
                <td>01/10/2024</td>
                <td>30/10/2024</td>
              </tr>

              <tr>
                <td>Sono Pesado</td>
                <td>Teste</td>
                <td>1ª Sala - A</td>
                <td>01/10/2024</td>
                <td>30/10/2024</td>
              </tr>
            </tbody>
          </table>

          <Row className='mt-auto gap-4 w-100 mx-1'>
            <Col className='p-4 border text-center'>
              <h1 style={{ fontSize: '18px' }}>Total Livros</h1>
              <h1 style={{ fontSize: '24px', color: '#1b93fe' }}>0</h1>
            </Col>
            <Col className='p-4 border text-center'>
              <h1 style={{ fontSize: '18px' }}>Empréstimos</h1>
              <h1 style={{ fontSize: '24px', color: '#3eaf3c' }}>0</h1>
            </Col>
            <Col className='p-4 border text-center'>
              <h1 style={{ fontSize: '18px' }}>Atrasados</h1>
              <h1 style={{ fontSize: '24px', color: '#d45d5d' }}>0</h1>
            </Col>
          </Row>
        </div>
      </div>
      <SweetAlert2 {...swalProps} />
    </Layout>
  )
}
