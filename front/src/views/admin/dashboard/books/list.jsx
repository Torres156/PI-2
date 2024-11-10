import { useEffect, useState } from 'react'
import { Layout } from '../includes/layout'
import { getSwal } from '../../../../app/helpers/SwalHelper'
import { useSearchParams } from 'react-router-dom'
import { GetResponse } from '../../../../app/helpers/httpHelper'

export function ListBooks () {
  const swal = getSwal()
  const [livros, setLivros] = useState([])

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    swal.showLoading()
    GetResponse('livros')
      .then(res => {
        setLivros(res.data)
        swal.close()

        const err = searchParams.get('err')
        if (err) {
          swal.fire('Ops! Aconteceu um problema.', err, 'error')
          searchParams.delete('err')
          setSearchParams(searchParams)
        }
      })
      .catch(err => {
        swal.fire(
          'Ops! Aconteceu um problema.',
          'Erro ao carregar listagem',
          'error'
        )
      })
  }, [])

  return (
    <Layout>
      <div className='card'>
        <div className='card-content p-4'>
          <h3>Listagem de Livros</h3>
          <hr />
          <div className='row gap-2 mt-4 justify-content-end'>
            <a
              href='/admin/books/create'
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
                <th scope='col'>Autor</th>
                <th scope='col' style={{ width: '100px' }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {livros.map(livro => (
                <tr>
                  <th scope='row'>{livro.id}</th>
                  <td>{livro.nome}</td>
                  <td>{livro.autor}</td>
                  <td className='d-flex justify-content-center'>
                    <button onClick={() => { window.location.href = `/admin/books/${livro.id}` } }
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
