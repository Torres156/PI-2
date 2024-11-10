import { useEffect, useState } from 'react'
import { Layout } from '../includes/layout'
import { DeleteResponse, GetResponse } from '../../../../app/helpers/httpHelper'
import { getSwal } from '../../../../app/helpers/SwalHelper'

export function ListUsers () {
  const [usuarios, setUsuarios] = useState([])
  const swal = getSwal()

  useEffect(() => {
    swal.showLoading()
    GetResponse('usuarios').then(res => {
      setUsuarios(res.data)
      swal.close()
    })
  }, [])

  const onDelete = id => {
    swal
      .fire({
        title: '',
        text: 'Você tem certeza que quer deletar este usuario?',
        icon: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'Sim',
        showDenyButton: true,
        denyButtonText: 'Não'
      })
      .then(result => {
        if (result.isConfirmed) {
          DeleteResponse(`usuarios/deletar/${id}`)
            .then(res => {
              swal
                .fire({
                  title: '',
                  text: 'Usuário deletado com sucesso!',
                  icon: 'success'
                })
                .then(result => {
                  window.location.reload()
                })
            })
            .catch(err => {
              swal.fire({
                title: 'Ops! Aconteceu um problema.',
                text: 'Erro ao deletar usuario.',
                icon: 'error'
              })
            })
        }
      })
  }

  return (
    <Layout>
      <div className='card'>
        <div className='card-content p-4'>
          <h3>Listagem de Usuarios</h3>
          <hr />
          <div className='row gap-2 mt-4 justify-content-end'>
            <a
              href='/admin/users/create'
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
                <th scope='col'>Nome</th>
                <th scope='col'>Email</th>
                <th scope='col'>Nivel</th>
                <th scope='col' style={{ width: '100px' }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(x => (
                <tr>
                  <th scope='row'>{x.id}</th>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                  <td>Administrador</td>
                  <td className='d-flex justify-content-center'>
                    <button
                      onClick={() => { window.location.href = `/admin/users/${x.id}` } }
                      className='btn btn-primary p-2'
                      style={{
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      <i className='bi bi-pencil-fill'></i>
                    </button>
                    <button
                      className='btn btn-danger p-2 mx-1'
                      style={{
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                      onClick={() => {onDelete(x.id)}}
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
    </Layout>
  )
}
