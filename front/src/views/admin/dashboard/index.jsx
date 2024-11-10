import { Card, Col, Row } from 'react-bootstrap'
import { Layout } from './includes/layout'
import SweetAlert2 from 'react-sweetalert2'
import { useEffect } from 'react'
import { useState } from 'react'
import { GetResponse } from '../../../app/helpers/httpHelper'
import { getSwal } from '../../../app/helpers/SwalHelper'

export function AdminDashboard () {
  const [swalProps, setSwalProps] = useState({})
  const [emprestados, setEmprestados] = useState([])
  const [dados, setDados] = useState([])
  const swal = getSwal();

  useEffect(() => {
    swal.showLoading();
    ;(async () => {
      let haveVencido = false;
      const emprestados = (await GetResponse('emprestimos/emprestados')).data      
      const processEmprestados = emprestados.map(x => {
        const date = new Date()
        date.setHours(0,0,0,0)
        const devolucao = new Date(x.dt_entrega)        
        devolucao.setHours(devolucao.getHours() + devolucao.getTimezoneOffset() / 60);
        devolucao.setHours(0,0,0,0)

        let obj = { ...x }
        obj['dt_entrega'] = devolucao.toLocaleDateString();        
        obj['created_at'] = new Date(obj['created_at']).toLocaleDateString();        
        obj['vencido'] = date > devolucao        

        if (obj['vencido'])        
          haveVencido = true;
        
        return obj
      })
      setEmprestados(processEmprestados)

      const dados = (await GetResponse('dashboard')).data;
      setDados(dados);
      swal.close()

      if (haveVencido)
        swal.fire('', 'Existe alunos com empréstimos atrasados de livro.')
    })()
  }, [])

  return (
    <Layout>
      <div className='card h-100'>
        <div className='card-content p-4 h-100 d-flex flex-column'>
          <h3>Início</h3>
          <hr />
          <table
            className='table mt-4 table-striped table-bordered'
            style={{ maxHeight: '460px' }}
          >
            <thead>
              <tr className='table-dark'>
                <th scope='col'>Livro</th>
                <th scope='col'>Aluno</th>
                <th scope='col'>Sala</th>
                <th scope='col'>Empréstimo</th>
                <th scope='col'>Devolução</th>
              </tr>
            </thead>
            <tbody>
              {emprestados?.map(x => (
                <tr>
                  <td className={x.vencido ? 'text-danger' : ''}>{x.livro.nome}</td>
                  <td className={x.vencido ? 'text-danger' : ''}>{x.aluno.nome}</td>
                  <td className={x.vencido ? 'text-danger' : ''}>{x.aluno.sala}</td>
                  <td className={x.vencido ? 'text-danger' : ''}>{x.created_at}</td>
                  <td className={x.vencido ? 'text-danger' : ''}>{x.dt_entrega}</td>
                </tr>
              ))}              
            </tbody>
          </table>

          <Row className='mt-auto gap-4 w-100 mx-1'>
            <Col className='p-4 border text-center'>
              <h1 style={{ fontSize: '18px' }}>Total Livros</h1>
              <h1 style={{ fontSize: '24px', color: '#1b93fe' }}>{dados.totalLivros}</h1>
            </Col>
            <Col className='p-4 border text-center'>
              <h1 style={{ fontSize: '18px' }}>Empréstimos</h1>
              <h1 style={{ fontSize: '24px', color: '#3eaf3c' }}>{dados.totalEmprestimos}</h1>
            </Col>
            <Col className='p-4 border text-center'>
              <h1 style={{ fontSize: '18px' }}>Atrasados</h1>
              <h1 style={{ fontSize: '24px', color: '#d45d5d' }}>{dados.totalVencidos}</h1>
            </Col>
          </Row>
        </div>
      </div>
      <SweetAlert2 {...swalProps} />
    </Layout>
  )
}
