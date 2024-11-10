import {
  Button,
  Card,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap'
import { LayoutSite } from './includes/layout'
import { CardContent } from '@mui/material'
import { useEffect, useState } from 'react'
import { GetResponse } from '../../app/helpers/httpHelper'
import { useParams } from 'react-router-dom'
import { GetApi } from '../../app/Enviroment'

export function Book () {
  const { id } = useParams()

  const onPlay = (text) => {
    if ('speechSynthesis' in window) {
      let mensagem = new SpeechSynthesisUtterance()
      const vozes = speechSynthesis.getVoices()
      mensagem.lang = 'pt-BR'
      mensagem.text = text
      speechSynthesis.speak(mensagem)
    }
  }

  const [livro, setLivro] = useState()

  useEffect(() => {
    GetResponse('dados/livro/' + id).then(res => setLivro(res.data))
  }, [])

  const tooltipPlay = <Tooltip id='tooltip'>Ouvir resumo!</Tooltip>
  return (
    <LayoutSite menu=''>
      <div className='text-center row' style={{ padding: '5rem 0' }}>
        <h1 style={{ color: 'white' }}>Livros</h1>
      </div>
      <div style={{ backgroundColor: 'whitesmoke' }}>
        <Container className='p-4'>
          <Row>
            <Col>
              <a href='/galeria'>
                <button className='button'>Voltar</button>
              </a>
              <h2 className='mt-4'>{livro?.nome}</h2>
              <span>
                {livro?.categoria && livro.categoria !== '' && (
                  <>
                    {' '}
                    Gênero: <strong>{livro.categoria}</strong>{' '}
                  </>
                )}
                {livro?.faixa_etaria && (
                  <span
                    className='background-primary text-white p-2'
                    style={{ borderRadius: '8px' }}
                  >
                    {livro.faixa_etaria}
                  </span>
                )}
              </span>
            </Col>
          </Row>

          <Row style={{ marginTop: '50px' }}>
            <Col>
              <p style={{ whiteSpace: 'pre-line' }}>{livro?.resumo}</p>
              <OverlayTrigger placement='right' overlay={tooltipPlay}>
                <span
                  style={{
                    cursor: 'pointer',
                    color: 'black',
                    fontSize: '30px'
                  }}
                  onClick={() => {onPlay(livro?.resumo)}}
                >
                  <i class='bi bi-play-circle-fill'></i>
                </span>
              </OverlayTrigger>
            </Col>
            <Col>
              <Card>
                <CardContent>
                  <div className='book-capa align-self-center' style={{ backgroundImage: `url(${GetApi()}/uploads/img/livro/${livro?.nm_foto})` }}></div>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutSite>
  )
}
