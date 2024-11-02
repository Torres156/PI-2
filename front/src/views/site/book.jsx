import { Button, Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { LayoutSite } from './includes/layout'
import { CardContent } from '@mui/material'

export function Book () {
  const text = `Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.`

  const onPlay = () => {
    if ('speechSynthesis' in window) {
      let mensagem = new SpeechSynthesisUtterance()
      const vozes = speechSynthesis.getVoices()
      mensagem.lang = 'pt-BR'
      mensagem.text = text
      speechSynthesis.speak(mensagem)
    }
  }

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
              <a href='/galeria'><button className='button'>Voltar</button></a>
              <h2 className='mt-4'>Titulo</h2>
              <span>
                Gênero: <strong>Aventura</strong>{' '}
                <span
                  className='background-primary text-white p-2'
                  style={{ borderRadius: '8px' }}
                >
                  10
                </span>
              </span>
            </Col>
          </Row>

          <Row style={{ marginTop: '50px' }}>
            <Col>
              <p>{text}</p>
              <OverlayTrigger placement="right" overlay={tooltipPlay}>
                  <span style={{ cursor: 'pointer',color:'black', fontSize: '30px' }} onClick={onPlay}><i class="bi bi-play-circle-fill"></i></span>
              </OverlayTrigger>
            </Col>
            <Col>
              <Card>
                <CardContent>
                  <div className='book-capa align-self-center'></div>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutSite>
  )
}
