import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate();

  function produto() {
    navigate('/produtos');
  }

  return (
    <>
      < div className="bg-rose-50 flex items-center justify-center pt-40 min-h-[92vh]" >
        <div className="flex flex-col gap-4 text items-center justify-center py-4">
          <h2 className="text-5xl font-bold text-center"><b>Qual é a sua Torta <b className="text-rose-600">Favorita</b>?</b></h2>

          <p className='text-2xl text-center'>Aproveite nossas tortas artesanais!</p>
          <p className='text-2xl text-center'>Escolha o sabor que deseja e finalize o pedido por WhatsApp.</p>

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

export default Home;

