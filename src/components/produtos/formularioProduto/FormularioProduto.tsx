import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'

import { AuthContext } from '../../../contexts/AuthContext'
import { Toast, ToastAlerta } from '../../../utils/ToastAlerta'
import { buscar, atualizar, cadastrar } from '../../../services/Service'

import Categoria from '../../../models/Categoria'
import Produto from '../../../models/Produto'

"use client";

import { ToggleSwitch } from 'flowbite-react'

function FormularioProduto() {

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: ''
  });

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: '',
    imagem: '',
    valor: 0,
    descricao: '',
    disponivel: true,
    quantidade: 0,
    total: 0,
    categoria: null
  });

  async function buscarProdutoPorId(id: string) {
    await buscar(`/produtos/${id}`, setProduto, { headers: { Authorization: token } });
  }

  async function buscarCategoriaPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria, { headers: { Authorization: token } });
  }

  async function buscarCategorias() {
    await buscar('/categorias/all', setCategorias, { headers: { Authorization: token } });
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizarProduto();
      } else {
        await cadastrarProduto();
      }
    } catch (error: any) {
      handleProdutoError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function atualizarProduto() {
    await atualizar(`/produtos`, produto, setProduto, { headers: { Authorization: token } });
    ToastAlerta('Produto atualizado', Toast.Sucess);
    retornar();
  }

  async function cadastrarProduto() {
    await cadastrar(`/produtos`, produto, setProduto, { headers: { Authorization: token } });
    ToastAlerta('Produto cadastrado', Toast.Sucess);
    retornar();
  }

  // function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
  //   const { name, checked } = e.target;
  //   setProduto((prevProduto) => ({ ...prevProduto, [name]: checked }));
  // }
  function handleCheckboxChange(checked: boolean) {
    setProduto((prevProduto) => ({ ...prevProduto, disponivel: checked }));
  }

  function handleProdutoError(error: any) {
    if (error.toString().includes('403')) {
      ToastAlerta('O token expirou, favor logar novamente', Toast.Error);
      handleLogout();
    } else {
      ToastAlerta('Erro ao cadastrar/atualizar o Produto', Toast.Error);
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria
    });
  }

  function atualizarEstadoTexto(e: ChangeEvent<HTMLTextAreaElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria
    });
  }

  function retornar() {
    navigate('/produtos');
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', Toast.Warning);
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) { buscarProdutoPorId(id); }
  }, [id]);

  useEffect(() => {
    setProduto({ ...produto, categoria: categoria });
  }, [categoria]);

  return (
    <>
      <div className=' py-40'>

        <div className="flex justify-center lg:mx-[20vw] font-bold lg:bg-white lg:border border-gray-200 rounded-lg lg:shadow-lg">

          <form className="flex justify-center items-center flex-col w-2/3 gap-3 py-10" onSubmit={gerarNovoProduto}>
            <h2 className="text-4xl text-center my-8 text-rose-900">
              {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h2>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="nome">Nome do Produto</label>
              <input
                className="border-2 border-slate-700 rounded p-2 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                type="text"
                placeholder="nome"
                name="nome"
                value={produto.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                required
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="imagem">Link da imagem</label>
              <input
                className="border-2 border-slate-700 rounded p-2 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                type="text"
                placeholder="imagem"
                name="imagem"
                value={produto.imagem}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                required
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="valor">Valor do Produto</label>
              <input
                className="border-2 border-slate-700 rounded p-2 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                type="number"
                placeholder="valor"
                name="valor"
                value={produto.valor}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                required
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="descricao">descricao do Produto</label>
              <textarea
                className="border-2 border-slate-700 rounded p-2 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                placeholder="descricao"
                name="descricao"
                value={produto.descricao}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstadoTexto(e)}
                required
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="categoria">Categoria do Produto</label>
              <select
                className="border-2 border-slate-700 rounded p-2 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                title="categoria"
                name="categoria"
                id="categoria"
                value={produto.categoria?.id || ''}
                onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                required
              >
                <option value="" disabled>Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                ))}
              </select>
            </div>

            <div className="flex max-w-md flex-col gap-4">
              <ToggleSwitch checked={produto.disponivel} label="Produto Disponível?" onChange={handleCheckboxChange} />
            </div>


            <button
              disabled={id !== undefined && produto.nome === ''}
              className='rounded disabled:bg-slate-200 bg-rose-500 hover:bg-rose-700 text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
              type='submit'
            >
              {isLoading ?
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                /> : id !== undefined ? <span>Editar</span> : <span>Cadastrar</span>
              }
            </button>
          </form >
        </div >
      </div>
    </>
  );
}

export default FormularioProduto;