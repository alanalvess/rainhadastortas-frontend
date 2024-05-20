import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/home/home';

import Categorias from './pages/categorias/Categorias';
import FormularioCategoria from './components/categorias/formularioCategoria/FormularioCategoria';
import DeletarCategoria from './components/categorias/deletarCategoria/DeletarCategoria';

import Produtos from './pages/produtos/Produtos';
import FormularioProduto from './components/produtos/formularioProduto/FormularioProduto';
import DeletarProduto from './components/produtos/deletarProduto/DeletarProduto';

import 'react-toastify/dist/ReactToastify.css';
import Carrinho from './pages/carrinho/Carrinho';

import Sobre from './pages/sobre/Sobre';

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>

          <ToastContainer />

          <Navbar />

          <div className=' bg-rose-50 min-h-[70vh]'>
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

          <Footer />

        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;