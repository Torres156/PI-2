import { useEffect, useState } from 'react'
import { Layout } from '../includes/layout'
import { DeleteResponse, GetResponse } from '../../../../app/helpers/httpHelper';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSearchParams } from 'react-router-dom';

export function ListStudent () {
  const [alunos, setAlunos] = useState([]);  
  const swal = withReactContent(Swal);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    swal.showLoading();
    GetResponse('alunos').then(res => {
      setAlunos(res.data);
      swal.close();

      const err  = searchParams.get('err')
      if (err)
      {      
        swal.fire('Ops! Aconteceu um problema.', err, 'error');
        searchParams.delete('err');
        setSearchParams(searchParams);
      }
    }).catch(err => {
      swal.fire('Ops! Aconteceu um problema.', 'Erro ao carregar listagem', 'error');
    })  
  },[])

  const onDelete = (id) => {
    swal.fire({
      title: '',
      text: 'Você tem certeza que quer deletar este aluno?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sim',
      showDenyButton: true,
      denyButtonText: 'Não',     
    }).then(result => {
      if (result.isConfirmed)
      {
        DeleteResponse(`alunos/deletar/${id}`).then(res => {
          swal.fire({title: '', text: 'Aluno deletado com sucesso!', icon: 'success'}).then((result) => {
            window.location.reload();
          })
        }).catch(err => {
          swal.fire({title: 'Ops! Aconteceu um problema.', text: 'Erro ao deletar aluno', icon: 'error'});
        })
      }
    })
  }

  return (
    <Layout>
      <div className='card'>
        <div className='card-content p-4'>
          <h3>Listagem de Alunos</h3>
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
                <th scope='col'>Nome</th>
                <th scope='col'>RA</th>
                <th scope='col' style={{ width: "100px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map(x => (
                <tr>
                <th scope='row'>{x.id}</th>
                <td>{x.nome}</td>
                <td>{x.ra}</td>
                <td className='d-flex justify-content-center'>
                    <button className='btn btn-primary p-2' style={{  color:"white", fontSize: "14px", fontWeight: "bold" }} onClick={() => { window.location.href = '/admin/student/' + x.id }}>
                        <i className='bi bi-pencil-fill'></i>
                    </button>
                    <button className='btn btn-danger p-2 mx-1' style={{  color:"white", fontSize: "14px", fontWeight: "bold" }} onClick={() => {onDelete(x.id)} }>
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
