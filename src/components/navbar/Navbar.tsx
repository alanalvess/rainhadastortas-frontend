import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, SignOut } from '@phosphor-icons/react'

import { AuthContext } from '../../contexts/AuthContext'
import { Toast, ToastAlerta } from '../../utils/ToastAlerta'


// import ModalCarrinho from '../carrinho/modalCarrinho/ModalCarrinho'
import Logo from '../../assets/images/logo.jpeg'
// import Produto from '../../models/Produto'
// import { calcularQuantidade } from '../../pages/carrinho/Carrinho'
// import { calcularQuantidade } from '../../pages/carrinho/Carrinho'

function Navbar() {

  let navbarComponent;

  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta('Usuário deslogado com sucesso', Toast.Sucess);
    navigate('/login');
  }

















  // const [produtosNoCarrinho, setProdutosNoCarrinho] = useState<Produto[]>([]);

  
  
  
  // function obterProdutoDoLocalStorage() {
  //   const produtosSalvos = localStorage.getItem('produtosNoCarrinho');
  //   if (produtosSalvos) {
  //     const produtosConvertidos = JSON.parse(produtosSalvos) as Produto[];
  //     // Faça o que for necessário com os produtos obtidos
  //     console.log(produtosConvertidos);
  //     return produtosNoCarrinho.reduce((quantidade, produto) => quantidade + produto.quantidade, 0);
  //   } else {
  //     console.log('Nenhum produto encontrado no localStorage.');
  //   }
  // }
  
  // useEffect(() => {
  //   const produtosSalvos = localStorage.getItem('produtosNoCarrinho');
  //   if (produtosSalvos) {
  //     const produtosConvertidos = JSON.parse(produtosSalvos) as Produto[];
  //     setProdutosNoCarrinho(produtosConvertidos);
  //   }
  // }, [produtosNoCarrinho]);
  
  // function calcularQuantidade(): number {
  //   return produtosNoCarrinho.reduce((quantidade, produto) => quantidade + produto.quantidade, 0);
  // }
  

  
  // const [produtosNoCarrinho, setProdutosNoCarrinho] = useState<Produto[]>([]);

  // const quantidadeTotal = calcularQuantidade();
















  // Exemplo de uso:

  if (usuario.token !== "") {
    navbarComponent = (
      <>
        <div className='w-full bg-rose-800 text-white flex justify-center py-4 fixed top-0 z-40'>
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

                <div className="container-total-carrinho badge-total-carrinho mx-1 hidden">0</div>
                <SignOut className="bg-rose-900 text-rose-200 p-1 rounded-lg mx-1 " size={40} weight="fill" />
              </Link>
            </div>
          </div>
        </div>
      </>
    );


  } else {
    navbarComponent = (
      <>
        <div className='w-full bg-rose-800 text-white flex justify-center py-4 fixed top-0 z-50'>
          <div className="container flex items-center justify-between text-2xl">
            <Link to='/home' className='text-2xl font-bold uppercase'>
              <img src={Logo} className='logo rounded-full' alt="logo" width={160} />
            </Link>

            <div className='flex gap-10'>
              <Link to='/sobre' className='hover:underline'>A Tortaria</Link>
              <Link to='/produtos/all' className='hover:underline'>Produtos</Link>
            </div>

            <div className="bg-rose-300 rounded-2xl p-2 text-black hover:bg-rose-900 hover:text-white " >

              <Link to={'/carrinho'}>
                <div className='flex items-center relative '>

                  <div className="container-total-carrinho badge-total-carrinho mx-1">
                    <p>Meu Carrinho</p>
                  </div>
                  <ShoppingCart className="bg-rose-600 text-rose-200 p-1 rounded-lg mx-1" size={45} weight="fill" />
                  <span className="absolute z-50 right-1 top-2 font-bold inline-flex items-center justify-center w-6 h-6 me-2 text-sm text-rose-950 rounded-full">
                    {/* {quantidadeTotal} */}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {navbarComponent}
    </>
  )
}

export default Navbar;