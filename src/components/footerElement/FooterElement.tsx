import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { InstagramLogo } from '@phosphor-icons/react'

import { AuthContext } from '../../contexts/AuthContext'

import { Footer, FooterCopyright, FooterIcon } from "flowbite-react";
import { BsInstagram } from "react-icons/bs";

function FooterElement() {

  let footerComponent;

  const { usuario } = useContext(AuthContext);

  if (usuario.token !== '') {
    footerComponent = (

      <Footer >
        <div className="w-full text-gray-200">
          <div className="w-full bg-rose-600 px-4 py-6 sm:flex sm:items-center sm:justify-around">
            <FooterCopyright by="Rainha das Tortas™ | Tortaria" year={2024} className='text-gray-200' />
            <div className="mt-4 flex flex-col items-center space-x-6 sm:mt-0 sm:justify-center">
              <p className='text-lg '>Link de acesso para clientes:</p>
              <span>https://rainhadastortas.vercel.app/</span>
            </div>
          </div>
        </div>
      </Footer>
      // <div className="flex justify-center bg-rose-400  mb-0">
      //   <div className="container flex justify-around items-center py-4 sticky">
      //     <p className='text-xl font-bold text-white '>Rainha das Tortas | Tortaria</p>
      //     <div className=' bg-rose-200 p-5 text-rose-950'>
      //     </div>
      //   </div>
      // </div>
    )
  } else {
    footerComponent = (
      <Footer >
        <div className="w-full text-gray-200 text-center">
          <div className="w-full bg-rose-600 px-4 py-6 sm:flex sm:items-center sm:justify-around">
            <Link to={'/login'}>
              <FooterCopyright by="Rainha das Tortas™ | Tortaria" year={2024} className='text-gray-200' />
            </Link>
            <div className="mt-4 flex items-center space-x-6 sm:mt-0 sm:justify-center">
              <p className='flex items-center gap-3 text-center'>
                Acesse nosso Instagram:
                <FooterIcon href="https://www.instagram.com/rainhadastortas2023/" icon={BsInstagram} className='text-gray-200' />
              </p>
            </div>
          </div>
        </div>
      </Footer>
    )
  }

  return (
    <>
      {footerComponent}
    </>
  )
}

export default FooterElement;