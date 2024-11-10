import { Col, Dropdown } from 'react-bootstrap'
import {
  OnlyDate,
  OnlyNumbers,
  OnlyPhone
} from '../../../../app/helpers/InputHelper'
import { Layout } from '../includes/layout'
import { Autocomplete, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { GetResponse, PostResponse } from '../../../../app/helpers/httpHelper'
import { getSwal } from '../../../../app/helpers/SwalHelper'

export function CreateLoans () {
  const swal = getSwal()

  const [optionsAluno, setOptionsAluno] = useState([])
  const [selectAluno, setSelectAluno] = useState()

  const [optionsLivro, setOptionsLivro] = useState([])
  const [selectLivro, setSelectLivro] = useState()

  const optionsEstado = [
    { id: 'novo', label: 'Novo' },
    { id: 'bom', label: 'Bom' },
    { id: 'danificado', label: 'Danificado' }
  ]

  useEffect(() => {
    swal.showLoading()
    ;(async () => {
      try {
        const alunos = await GetResponse('alunos')
        const optionsAluno = []
        alunos.data.map(x => {
          optionsAluno.push({ value: x.id, title: x.nome })
        })
        setOptionsAluno(optionsAluno);

        const livros = await GetResponse('emprestimos/livros')
        const optionsLivro = []
        livros.data.map(x => {
          optionsLivro.push({ value: x.id, title: x.nome })
        })
        setOptionsLivro(optionsLivro);

        swal.close()
      } catch {
        swal.fire("Ops! Aconteceu algo errado.", 'Falha ao carregar dados.', 'error');
      }
    })()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData(e.target);
    if (formData.get('dt_entrega').length != 10)
    {
      swal.fire('Ops! Aconteceu algo errado.', 'Data inválida!', 'error');
      return;
    }

    formData.set('id_aluno', selectAluno.value);
    formData.set('id_livro', selectLivro.value);

    const data = Object.fromEntries(formData);
    console.log(data);

    swal.showLoading();
    PostResponse('emprestimos/criar', data).then(res => {
      swal.fire({
        text: 'Empréstimo criado com sucesso!',
        icon: 'success',
        timer: 3000,
      }).then(res => {
        window.location.href = '/admin/loans'
      });
    }).catch(err =>{
      swal.fire('Ops! Aconteceu um problema.', 'Erro ao criar livro.', 'error');
    })
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
              <Autocomplete
                sx={{ '& .MuiInputBase-root': { padding: 0 } }}
                options={optionsAluno}                
                getOptionLabel={option => option.title}          
                getOptionKey={option => option.value}           
                onChange={(e, newValue) => {
                  setSelectAluno(newValue);
                }}        
                renderInput={params => (
                  <TextField name='id_aluno' {...params} required />
                )}
              />
            </div>

            <div className='row'>
              <label>Livro*</label>
              <Autocomplete
                sx={{ '& .MuiInputBase-root': { padding: 0 } }}
                options={optionsLivro}
                getOptionLabel={option => option.title}          
                getOptionKey={option => option.value}  
                onChange={(e, newValue) => { setSelectLivro(newValue); } }        
                renderInput={params => (
                  <TextField name='id_livro' {...params} required />
                )}
              />
            </div>

            <div className='row'>
              <Col>
                <label>Estado do Livro*</label>
                <select name='estado' className='form-control' required>
                  <option hidden>Selecione</option>
                  {optionsEstado.map(x => (
                    <option value={x.id}>{x.label}</option>
                  ))}
                </select>
              </Col>

              <Col>
                <label>Data de entrega*</label>
                <input
                  className='form-control'
                  onChange={OnlyDate}
                  name='dt_entrega'
                  minLength={10}
                  
                  required
                />
              </Col>
            </div>

            <div className='row gap-2 mt-4 px-2'>
              <a
                href='/admin/loans'
                className='btn btn-primary'
                style={{ width: '150px' }}
              >
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
