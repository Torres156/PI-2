import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { LayoutSite } from './includes/layout'
import { CardContent } from '@mui/material'
import { useEffect, useState } from 'react'
import { GetResponse } from '../../app/helpers/httpHelper'
import { GetApi } from '../../app/Enviroment'

export function Galeria () {
  const [dados, setDados] = useState()
  const [busca, setBusca] = useState('');
  function search()
  {    
    GetResponse('dados/livros', {busca: busca}).then(res => setDados(res.data));
  }

  useEffect(() => {
    search();
  },[])

  return (
    <LayoutSite menu='galeria'>
      <div className='text-center row' style={{ padding: '5rem 0' }}>
        <h1 style={{ color: 'white' }}>Galeria de livros</h1>
      </div>
      <div style={{ backgroundColor: 'whitesmoke' }}>
        <Container className='p-4'>
          <Row>
            <Col>
              <h2>
                Conheça <strong>nossos livros</strong>
              </h2>
              <p>Confirmar disponibilidade com o(a) secretário(a)!</p>
            </Col>

            <Col>
              <label className='w-100 position-relative search'>
                <input
                  className='w-100 '
                  name='search'
                  placeholder='Faça sua busca aqui:'
                  value={busca}
                  onChange={e => {setBusca(e.target.value)}}
                  onBlur={() => {search()}}
                  onKeyUp={e => {                    
                    if (e.key == 'Enter')
                      search();
                  }}
                />
                <button className='position-absolute button-search' onClick={() => {search()}}>
                  <svg
                    className='object-contain h-full w-full'
                    width='23'
                    height='23'
                    viewBox='0 0 23 23'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M22.1826 18.1247L18.3971 14.3391C19.0854 12.9626 19.5442 11.3566 19.5442 9.75062C19.5442 4.3591 15.1851 0 9.7936 0C4.40208 0 0.0429688 4.3591 0.0429688 9.75062C0.0429688 15.1421 4.40208 19.5012 9.7936 19.5012C11.3996 19.5012 13.0056 19.0424 14.3821 18.3541L18.1677 22.1396C19.3148 23.2868 21.0355 23.2868 22.1826 22.1396C23.2151 20.9925 23.2151 19.2718 22.1826 18.1247ZM9.7936 17.207C5.66392 17.207 2.33724 13.8803 2.33724 9.75062C2.33724 5.62095 5.66392 2.29426 9.7936 2.29426C13.9233 2.29426 17.25 5.62095 17.25 9.75062C17.25 13.8803 13.9233 17.207 9.7936 17.207Z'
                      fill='#00B1BA'
                    ></path>
                  </svg>
                </button>
              </label>
            </Col>
          </Row>

          <ul className='mt-4 grid'>
            {dados?.data?.map(x => (
              <li>
                <Card>
                  <CardContent
                    className='d-flex flex-row gap-4'
                    style={{ maxHeight: '200px' }}
                  >
                    <div className='capa align-self-center' style={{ backgroundImage: `url(${GetApi()}/uploads/img/livro/${x.nm_foto})` }}></div>
                    <div className='d-flex flex-column gap-2'>
                      <div className='text-wrap col'>
                        <h3>{x.nome}</h3>
                        <p className='m-0'>{x.resumo}</p>
                      </div>

                      <div className='text-wrap'>
                        <a href={'/book/' + x.id}><button className='button'>Ver mais</button></a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </LayoutSite>
  )
}
