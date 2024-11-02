import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { LayoutSite } from './includes/layout'

export function Home () {
  const capaStyle = {
    backgroundImage: `url(/assets/livros/teste.jpg)`,
    backgroundSize: '100% 100%',
    flexGrow: '1',
    minHeight: '350px'
  }

  const text = `Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.`;

  const onPlay = () =>
  {
    if ("speechSynthesis" in window) {
        let mensagem = new SpeechSynthesisUtterance();
        const vozes = speechSynthesis.getVoices();
        mensagem.lang = 'pt-BR'
        mensagem.text = text;
        speechSynthesis.speak(mensagem);
    }
  }

  const tooltipPlay = (
    <Tooltip id="tooltip">
      Ouvir resumo!
    </Tooltip>
  );

  return (
    <LayoutSite menu='home'>
      <div className='text-center row p-4'>
        <h1 style={{ color: 'white' }}>Sugestões de leitura</h1>
      </div>
      <Container
        className='position-relative'
        style={{
          marginTop: '150px',
          minHeight: '300px'
        }}
      >
        <div
          className='position-absolute transition'
          style={{
            color: 'white',
            left: -50,
            fontSize: '40px',
            top: '50%',            
          }}
        >
          <i class='bi bi-arrow-left-square-fill'></i>
        </div>
        <div
          className='position-absolute transition'
          style={{
            color: 'white',
            right: -50,
            fontSize: '40px',
            top: '50%'
          }}
        >
          <i class='bi bi-arrow-right-square-fill'></i>
        </div>

        <Row className='gap-3 '>
          <Col>
            <h2 style={{ color: 'white', fontSize: '30px' }}>TESTE</h2>
            <span style={{ color: '#fff2a3' }}>Autor: Sonhador</span>
            <hr />
            <p className='home-desc'>
              {text}
            </p>
            <OverlayTrigger placement="right" overlay={tooltipPlay}>
                <span style={{ cursor: 'pointer' }} onClick={onPlay}><i class="bi bi-play-circle-fill"></i></span>
            </OverlayTrigger>
          </Col>
          <Col xs={4}>
            <div style={capaStyle}></div>
          </Col>
        </Row>
      </Container>
    </LayoutSite>
  )
}
