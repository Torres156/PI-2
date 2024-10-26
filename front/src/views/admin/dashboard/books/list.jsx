import { Layout } from '../includes/layout'

export function ListBooks () {
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
                <th scope='col' style={{ width: "100px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>1</th>
                <td>Teste</td>
                <td>Teste</td>
                <td className='d-flex justify-content-center'>
                    <button className='btn btn-primary p-2' style={{  color:"white", fontSize: "14px", fontWeight: "bold" }}>
                        <i className='bi bi-pencil-fill'></i>
                    </button>
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
