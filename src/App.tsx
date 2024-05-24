import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './contexts/AuthContext';

import NavbarElement from './components/navbarElement/NavbarElement';
import FooterElement from './components/footerElement/FooterElement';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/home/home';

import Categorias from './pages/categorias/Categorias';
import FormularioCategoria from './components/categorias/formularioCategoria/FormularioCategoria';
import DeletarCategoria from './components/categorias/deletarCategoria/DeletarCategoria';

import Produtos from './pages/produtos/Produtos';
import FormularioProduto from './components/produtos/formularioProduto/FormularioProduto';
import DeletarProduto from './components/produtos/deletarProduto/DeletarProduto';

import Carrinho from './pages/carrinho/Carrinho';
import Sobre from './pages/sobre/Sobre';

import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>

          <ToastContainer />

          <div className='min-w-full h-[100vh] m-0 p-0 bg-rose-50'>

            <NavbarElement />

            <div className=' bg-rose-50 '>
              <Routes >

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/home" element={<Home />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/cadastroCategoria" element={<FormularioCategoria />} />
                <Route path="/editarCategoria/:id" element={<FormularioCategoria />} />
                <Route path="/deletarCategoria/:id" element={<DeletarCategoria />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produtos/all" element={<Produtos />} />
                <Route path="/cadastroProduto" element={<FormularioProduto />} />
                <Route path="/editarProduto/:id" element={<FormularioProduto />} />
                <Route path="/deletarProduto/:id" element={<DeletarProduto />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/sobre" element={<Sobre />} />

              </Routes>
            </div>

            <div className='absolute w-full'>

              <FooterElement />
            </div>

          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;