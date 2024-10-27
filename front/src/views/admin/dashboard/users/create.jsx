import {
  OnlyDate,
  OnlyNumbers,
  OnlyPhone
} from '../../../../helpers/InputHelper'
import { Layout } from '../includes/layout'

export function CreateUsers () {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Layout>
      <div className='card'>
        <div className='card-content p-4'>
          <h3>Cadastro de Usuário</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className='row gap-2'>
              <div className='col form-group'>
                <label>Nome do Usuário*</label>
                <input
                  className='form-control'
                  name='nome'
                  maxLength={50}
                  required
                  autoComplete='new-password'
                />
              </div>             
              <div className='col form-group'>
                <label>Senha*</label>
                <input
                  type='password'
                  className='form-control'
                  name='senha'
                  maxLength={50}
                  minLength={4}
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
                  maxLength={50}
                  required
                  autoComplete='new-password'
                />
              </div>              
            </div>

            <div className='row gap-2 mt-2'>             
              <div className='col form-group'>
                <label>Nivel*</label>
                <select className='form-control' name='sala' required>
                  <option hidden>Selecione</option>
                  <option value="1">Administrador</option>
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
