import { Button, Card } from 'react-bootstrap'
import Layout from './includes/layout'
import CSSProperties, { useState } from 'react'
import SweetAlert2 from 'react-sweetalert2'
import { PostResponse } from '../../../app/helpers/httpHelper'
import { User } from '../../../app/models/User'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin () {
  const [swalProps, setSwalProps] = useState({})

  function onSubmit (e) {
    e.preventDefault()

    const formData = new FormData(e.target);
    
    PostResponse('auth', Object.fromEntries(formData)).then(res => {
      User.Set(res.data);
      window.location.href = '/admin/dashboard'
    }).catch(err =>{
      console.log(err);
      setSwalProps({
        show: true,
        html: 'Ops! Aconteceu um problema!',
        title: 'Teste title',
        icon: 'error',
        onConfirm: () => {
          setSwalProps({})
        }
      })
    })    
  }

  return (
    <Layout style={{ background: `url('/assets/login-bg.jpg')` }}>
      <Card
        className='d-flex p-0 align-items-center'
        style={{
          backdropFilter: 'blur(7px)',
          borderColor: 'rgba(255,255,255,.5)',
          boxShadow: '0px 0px 6px 2px',

          maxWidth: '500px',
          maxHeight: '400px',
          height: '100%',
          backgroundColor: 'rgba(255,255,255,0.1)'
        }}
      >
        <img src='/assets/logo.png' width={300}></img>

        <form className='w-100 px-4' autoComplete='off' onSubmit={onSubmit}>
          <div class='form-group'>
            <label
              className='form-label text-white'
              style={{ textShadow: '1px 1px 4px black' }}
            >
              Email
            </label>
            <input
              className='form-control border-warning'
              type='email'
              name='usuario'
              autoComplete='new-password'
              required
            />
          </div>

          <div class='form-group mt-2'>
            <label
              className='form-label text-white'
              style={{ textShadow: '1px 1px 4px black' }}
            >
              Senha
            </label>
            <input
              type='password'
              className='form-control border-warning'
              name='senha'
              autoComplete='new-password'
              required
            />
          </div>

          <div className='d-flex justify-content-center'>
            <Button
              type='submit'
              className='mt-4 text-white'
              style={{ width: '100px', boxShadow: '0px 0px 4px 0px black' }}
            >
              Entrar
            </Button>
          </div>
        </form>
      </Card>
      <SweetAlert2 {...swalProps} />
    </Layout>
  )
}
