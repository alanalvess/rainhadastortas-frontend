import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { InstagramLogo } from '@phosphor-icons/react'

import { AuthContext } from '../../contexts/AuthContext'

function Footer() {

  let footerComponent;

  const { usuario } = useContext(AuthContext);

  if (usuario.token !== '') {
    footerComponent = (
      <>
        <div className="flex justify-center bg-rose-400  mb-0">
          <div className="container flex justify-around items-center py-4 sticky">
            <p className='text-xl font-bold text-white '>Rainha das Tortas | Tortaria</p>
            <div className=' bg-rose-200 p-5 text-rose-950'>
              <p className='text-lg'>Link de acesso para clientes:</p>
              <Link to='/home'>https://rainhadastortas.onrender.com/home</Link>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    footerComponent = (
      <>
        <div className="flex justify-center bg-rose-300 text-black w-full y bottom-0">
          <div className="container flex justify-around items-center py-4">
            <p className='text-xl font-bold'>
              Rainha das Tortas |<span> </span>
            <Link to='/login' className='hover:underline' target='blank'>
              Tortaria
            </Link>
            </p>
            <div className=' flex itens-center content-center'>
              <p className='text-lg content-center'>Acesse nosso Instagram: </p>
              <div className='flex gap-2'>
                <Link to='https://www.instagram.com/rainhadasprodutos2023/' className='hover:underline' target='blank'>
                  <InstagramLogo size={48} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {footerComponent}
    </>
  )
}

export default Footer;