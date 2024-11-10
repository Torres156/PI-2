import { useEffect, useState } from 'react'
import { Layout } from '../includes/layout'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import SweetAlert2 from 'react-sweetalert2'
import { getSwal } from '../../../../app/helpers/SwalHelper'
import {
  DeleteResponse,
  GetResponse,
  PostResponse,
  PutResponse
} from '../../../../app/helpers/httpHelper'
import { toDataDisplay } from '../../../../app/helpers/dataHelper'

export function ListLoans () {
  const [swalProps, setSwalProps] = useState({})
  const swal = getSwal()

  const [emprestimos, setEmprestimos] = useState([])

  useEffect(() => {
    swal.showLoading();
    GetResponse('emprestimos').then(res => {
      setEmprestimos(res.data)
      swal.close();
    })
  }, [])

  const tooltipDevolver = <Tooltip id='tooltip'>Devolver</Tooltip>

  const devolver = id => {
    setSwalProps({
      show: true,
      html: 'Deseja realmente fazer a devolução?',
      title: 'Devolução',
      showCancelButton: true,
      icon: 'warning',
      onResolve: e => {
        setSwalProps({})
        if (e.isConfirmed) {
          PutResponse('emprestimos/devolver/' + id)
            .then(res => {
              swal.fire('', 'Devolução feita com sucesso!', 'success')
              window.location.reload()
            })
            .catch(err => {
              swal.fire(
                'Ops! Aconteceu algo errado.',
                'Erro ao realizar devolução.',
                'error'
              )
            })
        }
      }
    })
  }

  const excluir = id => {
    setSwalProps({
      show: true,
      html: 'Deseja realmente excluir este empréstimo?',
      title: 'Excluir',
      showCancelButton: true,
      icon: 'warning',
      onResolve: e => {
        setSwalProps({})
        if (e.isConfirmed) {
          DeleteResponse('emprestimos/deletar/' + id)
            .then(res => {
              swal.fire(
                '',
                'Empréstimo/Devolução excluido com sucesso!',
                'success'
              )
              window.location.reload()
            })
            .catch(err => {
              swal.fire(
                'Ops! Aconteceu algo errado.',
                'Erro ao excluir o Empréstimo/Devolução',
                'error'
              )
            })
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
                <th scope='col' style={{ width: '100px' }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {emprestimos.map(x => (
                <tr>
                  <th scope='row'>{x.id}</th>
                  <td>{x.aluno.nome}</td>
                  <td>{x.livro.nome}</td>
                  <td>{x.status}</td>
                  <td>{toDataDisplay(x.dt_entrega)}</td>
                  <td className='d-flex justify-content-center'>
                    {x.status !== 'DEVOLVIDO' && (
                      <OverlayTrigger
                        placement='left'
                        overlay={tooltipDevolver}
                      >
                        <button
                          className='btn btn-primary p-2'
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: 'bold'
                          }}
                          onClick={() => {
                            devolver(x.id)
                          }}
                        >
                          <i className='bi bi-arrow-down-right-circle'></i>
                        </button>
                      </OverlayTrigger>
                    )}
                    <button
                      className='btn btn-danger p-2 mx-1'
                      style={{
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                      onClick={() => {
                        excluir(x.id)
                      }}
                    >
                      <i className='bi bi-trash'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <SweetAlert2 {...swalProps} />
    </Layout>
  )
}
