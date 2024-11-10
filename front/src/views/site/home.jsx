import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { LayoutSite } from './includes/layout'
import { useEffect, useState } from 'react';
import { GetResponse } from '../../app/helpers/httpHelper';
import { GetApi } from '../../app/Enviroment';

export function Home () {
  const capaStyle = {  
    backgroundSize: '100% 100%',
    flexGrow: '1',
    minHeight: '350px'
  }

  const onPlay = (text) =>
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

  const [livros, setLivros] = useState([]);
  const [selected, setSelected] = useState(0);  
  useEffect(() => {
    GetResponse('dados').then(res => setLivros(res.data));
  }, [])

  return (
    <LayoutSite menu='home'>
      { livros.length > 0 && (<>
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
            cursor: 'pointer',
          }}
          onClick={() => {
            let value = selected - 1;
            if (value < 0)
              value = livros.length - 1;
            setSelected(value)
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
            top: '50%',
            cursor: 'pointer',
          }}
          onClick={() => {
            let value = selected + 1;
            if (value >= livros.length)
              value = 0;
            setSelected(value)
          }}
        >
          <i class='bi bi-arrow-right-square-fill'></i>
        </div>

        <Row className='gap-3 '>
          <Col>
            <h2 style={{ color: 'white', fontSize: '30px' }}>{livros[selected].nome}</h2>
            <span style={{ color: '#fff2a3' }}>Autor: {livros[selected].autor}</span>
            <hr />
            <p className='home-desc' style={{ whiteSpace: 'pre-line' }}>
              {livros[selected].resumo}
            </p>
            <OverlayTrigger placement="right" overlay={tooltipPlay}>
                <span style={{ cursor: 'pointer',color:'white' }} onClick={() => {onPlay(livros[selected].resumo)}}><i class="bi bi-play-circle-fill"></i></span>
            </OverlayTrigger>
          </Col>
          <Col xs={4}>
            <div style={{...capaStyle, backgroundImage: `url(${GetApi()}/uploads/img/livro/${livros[selected].nm_foto})`}}></div>
          </Col>
        </Row>
      </Container>
      </>)}
    </LayoutSite>
  )
}
