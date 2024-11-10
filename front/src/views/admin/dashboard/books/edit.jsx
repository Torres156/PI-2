import withReactContent from 'sweetalert2-react-content';
import { GetResponse, PostUploadResponse } from '../../../../app/helpers/httpHelper';
import {
  ImageTo,
  OnlyDate,
  OnlyNumbers,
  OnlyPhone,
  useForm
} from '../../../../app/helpers/InputHelper'
import { Layout } from '../includes/layout'
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function EditBook () {  

  const swal = withReactContent(Swal);
  const {id} = useParams();
  const [livro, setLivro, handleChange] = useForm({})

  useEffect(() => {
    GetResponse(`livros/${id}`).then(res => setLivro(res.data))
    .catch(err => {
      window.location.href = '/admin/books?err=Livro não encontrado!'
    })
  },[])

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData(e.target);
    formData.append('id', id);
    PostUploadResponse('livros/salvar', formData).then(res => {
      swal.fire({
        text: 'Livro atualizado com sucesso!',
        icon: 'success',
        timer: 3000,
      }).then(res => {
        window.location.href = '/admin/books'
      });
    }).catch(err=> {
      swal.fire('Ops! Aconteceu um problema.', 'Erro ao criar livro.', 'error');
    })
  }

  const imagemCss = {    
    width: "50px",
    height: "50px",
    border: "thin solid gray",
    backgroundColor: "rgb(236, 234, 234)",
    backgroundSize: "100% 100%",
    backgroundImage: `url(${livro.imagem})`,
  } 

  return (
    <Layout>
      <div className='card'>
        <div className='card-content p-4'>
          <h3>Edição de Livro</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className='row gap-2'>
              <div className='col form-group'>
                <label>Código</label>
                <input
                  className='form-control'
                  name='code'
                  maxLength={50}
                  value={livro.id}                  
                  autoComplete='new-password'
                  disabled
                />
              </div>
              <div className='col form-group'>
                <label>Localização</label>
                <input
                  className='form-control'
                  name='localizacao'
                  value={livro.localizacao}
                  onChange={handleChange}
                  maxLength={50}
                  autoComplete='new-password'
                />
              </div>
              <div className='col form-group'>
                <label>Editora</label>
                <input
                  className='form-control'
                  name='editora'
                  maxLength={50}
                  autoComplete='new-password'
                  value={livro.editora}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='row gap-2 mt-2'>
              <div className='col form-group'>
                <label>Nome do Livro*</label>
                <input
                  className='form-control'
                  name='nome'
                  maxLength={255}
                  autoComplete='new-password'
                  value={livro.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='col form-group'>
                <label>Autor*</label>
                <input
                  className='form-control'
                  name='autor'
                  maxLength={100}
                  autoComplete='new-password'
                  value={livro.autor}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='row gap-2 mt-2'>
              <div className='col-3 form-group'>
                <label>Categoria/Gênero</label>
                <input
                  className='form-control'
                  name='categoria'
                  maxLength={100}
                  autoComplete='new-password'   
                  value={livro.categoria}
                  onChange={handleChange}               
                />
              </div>
              <div className='col-1 form-group' style={{ minWidth: "150px" }}>
                <label>Faixa Etária</label>
                <input
                  className='form-control'
                  name='faixa_etaria'
                  maxLength={2}
                  autoComplete='new-password'                                    
                  onInput={OnlyNumbers}
                  value={livro.faixa_etaria}
                  onChange={handleChange}
                />
              </div>
            </div>            

            <div className='d-flex row gap-2 w-100 m-0 mt-3 align-items-center' >
              <div id='imagem' className='d-flex ml-4' style={imagemCss}></div>

              <div className='col-3 w-100'  style={{ minWidth: "300px", maxWidth: "calc(100% - 58px)", paddingRight: "0" }}>
                <input
                  className='form-control border-warning'
                  accept='.jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*'
                  type='file'
                  name='foto'
                  placeholder='Carrega a foto do livro'                  
                  onChange={e => {ImageTo(e, "imagem");}}                  
                />
              </div>
            </div>

            <div className='row mt-4'>
              <div className='col form-group'>
                <label>Resumo</label>
                <textarea
                  className='form-control'
                  name='resumo'
                  maxLength={1000}
                  autoComplete='new-password' 
                  value={livro.resumo}
                  onChange={handleChange}
                />
              </div>              
            </div>

            <div className='row gap-2 mt-4 px-2'>
              <a
                href='/admin/books'
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
