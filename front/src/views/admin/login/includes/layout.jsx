import { Container } from "react-bootstrap";

export default function Layout ({children, style}) {
    
  return (
    <>
      <main className="vw-100 vh-100 bg-dark flex row justify-content-center align-items-center m-0" style={style}>       
        {children}
      </main>
    </>
  )
}
