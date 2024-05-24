import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, SignOut } from '@phosphor-icons/react'

import { AuthContext } from '../../contexts/AuthContext'
import { Toast, ToastAlerta } from '../../utils/ToastAlerta'

import Logo from '../../assets/images/logo.jpeg'
import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react'

function NavbarElement() {

  let navbarComponent;

  const navigate = useNavigate();

  const { usuario, handleLogout, quantidadeProdutos } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta('Usuário deslogado', Toast.Sucess);
    navigate('/login');
  }

  if (usuario.token !== "") {
    navbarComponent = (
      <>
        {/* <div className='w-full bg-rose-800 text-white flex justify-center py-4 fixed top-0 z-40'>
          <div className="container flex items-center justify-between text-2xl">
            <Link to='/home' className='text-2xl font-bold uppercase'>
              <img src={Logo} className='logo rounded-full' alt="logo" width={160} />
            </Link>

            <div className='flex gap-10'>
              <Link to='/produtos' className='hover:underline'>Produtos</Link>
              <Link to='/categorias' className='hover:underline'>Categorias</Link>
            </div>

            <div className="bg-rose-300 rounded-lg p-2 text-black hover:bg-rose-900 hover:text-white " >
              <Link to='' onClick={logout} className='flex items-center '>
                <div className='mx-1'>Sair</div>

                <SignOut className="bg-rose-900 text-rose-200 p-1 rounded-lg mx-1 " size={40} weight="fill" />
              </Link>
            </div>
          </div> */}

        <Navbar fluid className='bg-rose-800 fixed top-0 z-40 w-full justify-between '>
          <NavbarBrand>
            <Link to='/home' className='text-2xl font-bold uppercase'>
              <img src={Logo} className='logo rounded-3xl' alt="logo" width={100} />
            </Link>
          </NavbarBrand>
          <div className="flex md:order-2">

            <NavbarToggle className='text-gray-200' />
          </div>
          <NavbarCollapse className='my-4'>
            <div className='flex gap-4 items-center'>
              <NavbarLink className='bg-rose-600 items-center' active><Link to='/produtos' className='text-gray-200 items-center'>Produtos</Link></NavbarLink>
              <NavbarLink className='bg-rose-600' active><Link to='/categorias' className='text-gray-200'>Categorias</Link></NavbarLink>

            </div>
            <div className="bg-rose-300 rounded-lg px-2 text-black my-4 max-w-32 hover:text-white " >
              <Link to='' onClick={logout} className='flex items-center justify-center'>
                <span className=''>Sair</span>

                <SignOut className=" text-rose-900 p-1 rounded-lg " size={40} weight="fill" />
              </Link>
            </div>
          </NavbarCollapse>
        </Navbar>
      </>
    );


  } else {
    navbarComponent = (
      <>

        <Navbar fluid className='bg-rose-800 fixed top-0 z-40 w-full '>
          <NavbarBrand>
            <Link to='/home' className='text-2xl font-bold uppercase'>
              <img src={Logo} className='logo rounded-3xl' alt="logo" width={100} />
            </Link>
          </NavbarBrand>

          <div>

            <div className="flex md:order-2">

              <NavbarToggle className='text-gray-200' />
            </div>
            <NavbarCollapse className='my-4 '>

              <div className='flex gap-4 items-center'>
                <NavbarLink className='bg-rose-600' active><Link to='/sobre' className='text-gray-200 '>A Tortaria</Link></NavbarLink>
                <NavbarLink className='bg-rose-600' active><Link to='/produtos' className='text-gray-200'>Produtos</Link></NavbarLink>

              </div>

            </NavbarCollapse>
          </div>
          <div >

            <Link to={'/carrinho'}>
              <div className='flex items-center relative my-4 max-w-40'>

                <div className="container-total-carrinho badge-total-carrinho text-gray-200 mx-1">
                  <p>Meu Carrinho</p>
                </div>

                <ShoppingCart className="bg-rose-600 text-rose-200 p-1 rounded-lg mx-1 " size={45} weight="fill" />

                <span className="absolute z-50 right-1 top-2 inline-flex items-center justify-center w-6 h-6 me-2 text-sm text-rose-600 font-bold rounded-full">
                  {quantidadeProdutos}

                </span>
              </div>
            </Link>
          </div>
        </Navbar>
        {/* <div className='w-full bg-rose-800 text-white flex justify-center py-4 fixed top-0 z-50'>
          <div className="container flex items-center justify-between text-2xl">
            <div className='flex gap-10'>
              <Link to='/sobre' className='hover:underline'>A Tortaria</Link>
              <Link to='/produtos/all' className='hover:underline'>Produtos</Link>
            </div>

            <div className="bg-rose-300 rounded-2xl p-2  hover:bg-rose-900 hover:text-white " >

              <Link to={'/carrinho'}>
                <div className='flex items-center relative '>

                  <div className="container-total-carrinho badge-total-carrinho text-black mx-1">
                    <p>Meu Carrinho</p>
                  </div>

                  <ShoppingCart className="bg-rose-600 text-rose-200 p-1 rounded-lg mx-1" size={45} weight="fill" />

                  <span className="absolute z-50 right-1 top-2 inline-flex items-center justify-center w-6 h-6 me-2 text-sm text-rose-600 font-bold rounded-full">
                    {quantidadeProdutos}

                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div> */}
      </>
    )
  }

  return (
    <>
      {navbarComponent}
    </>
  )
}

export default NavbarElement;