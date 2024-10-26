import { Card, Navbar } from 'react-bootstrap'
import { Menu } from './sidebar'

export function Layout ({ children, style }) {
  let styleCard = {
    maxWidth: '700px'
  }

  return (
    <>
      <main
        className='vw-100 vh-100 bg-dark flex row justify-content-center align-items-center m-0'
        style={style}
      >
        <Menu>{children}</Menu>
      </main>
    </>
  )
}
