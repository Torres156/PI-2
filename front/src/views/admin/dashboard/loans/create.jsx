import { Dropdown } from 'react-bootstrap';
import {
  OnlyDate,
  OnlyNumbers,
  OnlyPhone
} from '../../../../helpers/InputHelper'
import { Layout } from '../includes/layout'
import { Autocomplete, TextField } from '@mui/material';


export function CreateLoans () {
  const optionsAluno = [
    { id: 'chocolate', label: 'Chocolate' },
    { id: 'strawberry', label: 'Strawberry' },
    { id: 'vanilla', label: 'Vanilla' }
  ]

  const optionsLivro = [
    { id: 'chocolate', label: 'Chocolate' },
    { id: 'strawberry', label: 'Strawberry' },
    { id: 'vanilla', label: 'Vanilla' }
  ]

  const optionsEstado = [
    { id: 'novo', label: 'Novo' },
    { id: 'bom', label: 'Bom' },
    { id: 'danificado', label: 'Danificado' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Layout>
      <div className='card'>
        <div className='card-content p-4'>
          <h3>Cadastro de Empréstimo</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className='row'>              
                <label>Aluno*</label>               
                <Autocomplete sx={{ '& .MuiInputBase-root' : { padding: 0} }} options={optionsAluno}  renderInput={(params) => <TextField name='aluno' {...params} required />} />
            </div>

            <div className='row'>              
                <label>Livro*</label>               
                <Autocomplete sx={{ '& .MuiInputBase-root' : { padding: 0} }} options={optionsLivro}  renderInput={(params) => <TextField name='livro' {...params} required />} />
            </div>

            <div className='row'>              
                <label>Estado do Livro*</label>               
                <select className='form-control mx-2' required>
                  <option hidden>Selecione</option>
                  {
                    optionsEstado.map(x => (
                      <option value={x.id}>{x.label}</option>
                    ))
                  }
                </select>
            </div>

            <div className='row gap-2 mt-4 px-2'>
              <a href='/admin/loans'  className='btn btn-primary' style={{ width: '150px' }}>
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
