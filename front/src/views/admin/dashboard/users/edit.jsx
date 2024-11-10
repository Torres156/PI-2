import { useEffect, useState } from 'react';
import { GetResponse, PostResponse } from '../../../../app/helpers/httpHelper';
import {
  OnlyDate,
  OnlyNumbers,
  OnlyPhone,
  useForm
} from '../../../../app/helpers/InputHelper'
import { getSwal } from '../../../../app/helpers/SwalHelper';
import { Layout } from '../includes/layout'
import { useParams } from 'react-router-dom';

export function EditUsers () {
  const swal = getSwal();
  const [usuario, setUsuario, ,handleChangeWithKey] = useForm({});
  const {id} = useParams();

  useEffect(() => {
    GetResponse('usuarios/' + id).then(res => setUsuario(res.data));
  },[])
  
  const handleSubmit = (e) => {
    e.preventDefault();

    swal.showLoading();
    const formData = new FormData(e.target);
    formData.append('id', id);
    PostResponse('usuarios/salvar', Object.fromEntries(formData)).then(res => {
      swal.fire({
        text: 'Usuario editado com sucesso!',
        icon: 'success',
        timer: 3000,
      }).then(res => {
        window.location.href = '/admin/users'
      });
    }).catch(err => {
      console.log(err);
      swal.fire('Ops! Aconteceu algo errado.', err.response.data, 'error');
    })
  }

  return (
    <Layout>
      <div className='card'>
        <div className='card-content p-4'>
          <h3>Edição de Usuário</h3>
          <hr />
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className='row gap-2'>
              <div className='col form-group'>
                <label>Nome do Usuário*</label>
                <input
                  className='form-control'
                  name='nome'
                  maxLength={50}
                  value={usuario.name}
                  onChange={e => { handleChangeWithKey(e, 'name'); }}
                  required
                  data-auto-off
                  autoComplete='new-password'
                  
                />
              </div>             
              <div className='col form-group'>
                <label>Senha (Deixe em branco para não for trocar a senha)</label>
                <input
                  type='password'
                  className='form-control'
                  name='senha'
                  maxLength={50}
                  minLength={4}                                    
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
                  maxLength={50}
                  required
                  value={usuario.email}
                  autoComplete='new-password'
                  disabled
                />
              </div>              
            </div>

            <div className='row gap-2 mt-2'>             
              <div className='col form-group'>
                <label>Nivel*</label>
                <select className='form-control' name='nivel' required>
                  <option hidden>Selecione</option>
                  <option value="1" selected>Administrador</option>
                </select>
              </div>
            </div>

            <div className='row gap-2 mt-4 px-2'>
              <a href='/admin/users'  className='btn btn-primary' style={{ width: '150px' }}>
                Voltar
              </a>
              <button className='btn btn-primary' style={{ width: '150px' }}>
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
