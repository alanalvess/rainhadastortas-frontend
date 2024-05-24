import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

function Home() {
  
  let homeCoponent;

  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  function produto() {
    navigate('/produtos');
  }

  if (usuario.token !== "") {
    homeCoponent = (
      <div className="bg-rose-50 flex justify-center pt-40 max-w-full min-h-[88vh]">
        <div className="flex flex-col items-center justify-center p-4">
          <div className="flex justify-around  h-[20vh] gap-10 xs:flex-col ">
            <button className='border bg-rose-200 text-rose-900 xs:text-xl lg:text-5xl p-4 xs:rounded-xl lg:rounded-3xl lg:hover:text-5xl hover:text-rose-200 hover:bg-rose-600 w-full'>
              <Link to={'/cadastroCategoria'}>Cadastrar Categoria</Link>
            </button>
            
            <button className='border bg-rose-200 text-rose-900 xs:text-xl lg:text-5xl p-4 xs:rounded-xl lg:rounded-3xl lg:hover:text-5xl hover:text-rose-200 hover:bg-rose-600 w-full'>
              <Link to={'/cadastroProduto'}>Cadastrar Produto</Link>
            </button>
          </div>
        </div>
      </div>
    );

  } else {
    homeCoponent = (
      <>
        < div className="bg-rose-50 flex items-center justify-center pt-40 min-h-[92vh]" >
          <div className="flex flex-col gap-4 text items-center justify-center py-4">
            <h2 className="text-5xl font-bold"><b>Qual é a sua Torta <b className="text-rose-600">Favorita</b>?</b></h2>

            <p className='text-2xl'>Aproveite nossas tortas artesanais!</p>
            <p className='text-2xl'>Escolha o sabor que deseja e finalize o pedido por WhatsApp.</p>

            <div className="flex justify-around gap-4">
              <button className='rounded-xl bg-white text-rose-600 py-2 px-4 hover:bg-rose-300' onClick={produto}>
                SABORES
              </button>
            </div>
          </div>
        </div >
      </>
    )
  }

  return (
    <>
      {homeCoponent}
    </>
  )
}

export default Home;

