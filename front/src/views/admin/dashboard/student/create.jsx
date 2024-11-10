import { useState } from 'react';
import { PostResponse } from '../../../../app/helpers/httpHelper';
import {
  OnlyDate,
  OnlyNumbers,
  OnlyPhone
} from '../../../../app/helpers/InputHelper'
import { Layout } from '../includes/layout'
import SweetAlert2 from 'react-sweetalert2'

export function CreateStudent () {
  const options = Array.from({ length: 5 }, (_, i) => i + 1)
  const [swalProps, setSwalProps] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log(data);

    PostResponse('alunos/criar', data).then(res => {
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
    console.log(err);
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
          <h3>Cadastro de Aluno</h3>
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
                  required
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
                  autoComplete='new-password'
                />
              </div>
              <div className='col form-group'>
                <label>Data de Nascimento</label>
                <input
                  className='form-control'
                  onChange={OnlyDate}
                  name='dt_nascimento'
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
                  onChange={OnlyPhone}
                  maxLength={15}
                />
              </div>
              <div className='col form-group'>
                <label>Sala</label>
                <select className='form-control' name='sala' required>
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
