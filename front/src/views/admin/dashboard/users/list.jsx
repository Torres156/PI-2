import { Layout } from '../includes/layout'

export function ListUsers () {
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
                <th scope='col' style={{ width: "100px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>1</th>
                <td>Teste</td>
                <td>teste@teste.com</td>
                <td>Administrador</td>
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
