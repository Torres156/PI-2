import {
  ImageTo,
  OnlyDate,
  OnlyNumbers,
  OnlyPhone
} from '../../../../helpers/InputHelper'
import { Layout } from '../includes/layout'

export function CreateBook () {
  const options = ['']

  const handleSubmit = e => {
    e.preventDefault()
  }

  const imagemCss = {    
    width: "50px",
    height: "50px",
    border: "thin solid gray",
    backgroundColor: "rgb(236, 234, 234)",
    backgroundSize: "100% 100%",
  } 

  return (
    <Layout>
      <div className='card'>
        <div className='card-content p-4'>
          <h3>Cadastro de Livro</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className='row gap-2'>
              <div className='col form-group'>
                <label>Código</label>
                <input
                  className='form-control'
                  name='code'
                  maxLength={50}
                  required
                  autoComplete='new-password'
                  readOnly
                />
              </div>
              <div className='col form-group'>
                <label>Localização</label>
                <input
                  className='form-control'
                  name='localizacao'
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
                  required
                />
              </div>
              <div className='col-1 form-group' style={{ minWidth: "150px" }}>
                <label>Faixa Etária</label>
                <input
                  className='form-control'
                  name='etaria'
                  maxLength={2}
                  autoComplete='new-password'
                  required
                  onInput={OnlyNumbers}
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
                  onChange={e => {ImageTo(e, "imagem")}}                  
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
