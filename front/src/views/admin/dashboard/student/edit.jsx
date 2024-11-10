import { useEffect, useState } from 'react';
import { GetResponse, PostResponse } from '../../../../app/helpers/httpHelper';
import {
  OnlyDate,
  OnlyNumbers,
  OnlyPhone,
  useForm
} from '../../../../app/helpers/InputHelper'
import { Layout } from '../includes/layout'
import SweetAlert2 from 'react-sweetalert2'
import { useParams } from 'react-router-dom';

export function EditStudent () {
  const options = Array.from({ length: 5 }, (_, i) => i + 1)
  const [swalProps, setSwalProps] = useState({})

  const [aluno, setAluno, handleChange] = useForm({});
  const {id}  = useParams();

  useEffect(() => {
    GetResponse(`alunos/${id}`).then(res => setAluno(res.data))
    .catch(err => {
      window.location.href = '/admin/student?err=Aluno não encontrado!'
    })
  },[])
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append('id', aluno?.id);
    const data = Object.fromEntries(formData);

    PostResponse('alunos/salvar', data).then(res => {
      setSwalProps({
        show: true,
        html: res.data,
        title: 'Operação feita com sucesso!',
        icon: 'success',
        onConfirm: () => {
          setSwalProps({})
          window.location.href = '/admin/student'
        }
      })
    }).catch(err => {    
      setSwalProps({
        show: true,
        html: err.data,
        title: 'Ops! Aconteceu um problema!',
        icon: 'error',
        onConfirm: () => {
          setSwalProps({})
        }
      })
    })
  }
  
  return (
    <Layout>
      <div className='card'>
        <div className='card-content p-4'>
          <h3>Edição de Aluno</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className='row gap-2'>
              <div className='col form-group'>
                <label>Nome do Aluno*</label>
                <input
                  className='form-control'
                  name='nome'
                  maxLength={50}
                  required     
                  value={aluno?.nome}     
                  onChange={handleChange}                          
                  autoComplete='new-password'
                />
              </div>
              <div className='col form-group'>
                <label>RA*</label>
                <input
                  className='form-control'
                  onInput={OnlyNumbers}
                  name='ra'
                  maxLength={10}
                  value={aluno?.ra}  
                  disabled
                  autoComplete='new-password'
                />
              </div>
            </div>

            <div className='row gap-2 mt-2'>
              <div className='col form-group'>
                <label>Email</label>
                <input
                  className='form-control'
                  type='email'
                  name='email'
                  maxLength={100}
                  value={aluno?.email}     
                  onChange={handleChange}                   
                  autoComplete='new-password'
                />
              </div>
              <div className='col form-group'>
                <label>Data de Nascimento</label>
                <input
                  className='form-control'
                  onChange={(e) => {
                    OnlyDate(e)
                    handleChange(e)
                  }}
                  name='dt_nascimento'
                  value={aluno?.dt_nascimento}
                  minLength={10}
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <div className='row gap-2 mt-2'>
              <div className='col form-group'>
                <label>Telefone</label>
                <input
                  className='form-control'
                  name='telefone'
                  onChange={(e) => {
                    OnlyPhone(e)
                    handleChange(e)
                  }}              
                  value={aluno?.telefone}    
                  maxLength={15}
                />
              </div>
              <div className='col form-group'>
                <label>Sala</label>
                <select className='form-control' name='sala' required value={aluno?.sala} onChange={handleChange}>
                  <option hidden>Selecione</option>
                  {options.map(x => (
                    <>
                      <option>{x}º A</option>
                      <option>{x}º B</option>
                      <option>{x}º C</option>
                    </>
                  ))}
                </select>
              </div>
            </div>

            <div className='row gap-2 mt-4 px-2'>
              <a href='/admin/student'  className='btn btn-primary' style={{ width: '150px' }}>
                Voltar
              </a>
              <button className='btn btn-primary' style={{ width: '150px' }}>
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
      <SweetAlert2 {...swalProps} />
    </Layout>
  )
}
