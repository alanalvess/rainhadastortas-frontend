import { useContext, useEffect, useState } from 'react'

import { buscarTudo } from '../../services/Service'
import { Toast, ToastAlerta } from '../../utils/ToastAlerta'

import Categoria from '../../models/Categoria'
import Produto from '../../models/Produto'
import CardProdutoCliente from '../../components/produtos/cardProdutoCliente/CardProdutoCliente'
import CardProdutoAdmin from '../../components/produtos/cardProdutoAdmin/CardProdutoAdmin'
import { AuthContext } from '../../contexts/AuthContext'

function Produtos() {

  const { usuario } = useContext(AuthContext);

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [produtosNoCarrinho, setProdutosNoCarrinho] = useState<Produto[]>([]);

  const produtosFiltrados = produtos.filter((produto) => produto.categoria?.nome === categoriaSelecionada);
  const produtosOrdenados = produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
  const produtosDisponiveis = produtosOrdenados.filter((produto) => produto.disponivel);
  const produtosIndisponiveis = produtosOrdenados.filter((produto) => !produto.disponivel);
  const todosOsProdutos = [...produtosDisponiveis, ...produtosIndisponiveis];

  async function buscarCategorias() {
    try {
      await buscarTudo('/categorias/all', setCategorias);
    } catch (error: any) {
      ToastAlerta('O token expirou, favor logar novamente', Toast.Info);
    }
  }

  async function buscarProdutos() {
    try {
      await buscarTudo('/produtos/all', setProdutos);

    } catch (error: any) {
      ToastAlerta('O token expirou, favor logar novamente', Toast.Warning);
    }
  }

  function adicionarNovoProduto(produto: Produto) {
    const novoProduto = {
      ...produto,
      quantidade: 1,
      total: produto.valor
    }

    setProdutosNoCarrinho((prevProdutos) => [...prevProdutos, novoProduto]);
  }

  function salvarNoLocalStorage() {
    localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtosNoCarrinho));
  }

  function adicionarAoCarrinho(produto: Produto) {
    const produtoExistente = produtosNoCarrinho.find((p) => p.id === produto.id);

    if (!produtoExistente) {
      adicionarNovoProduto(produto);
      ToastAlerta('Produto adicionado ao carrinho', Toast.Sucess)
    } else {
      ToastAlerta('Produto já está no carrinho', Toast.Info)
    }

    salvarNoLocalStorage();
  }

  function handleCategoriaClick(categoriaNome: string) {
    setCategoriaSelecionada(categoriaNome);
  }

  useEffect(() => {
    const produtosSalvos = localStorage.getItem('produtosNoCarrinho');

    if (produtosSalvos) {
      const produtosConvertidos = JSON.parse(produtosSalvos) as Produto[];
      setProdutosNoCarrinho(produtosConvertidos);
    }
  }, []);

  useEffect(() => {
    buscarCategorias();
    buscarProdutos();
  }, [categoriaSelecionada, categorias.length]);

  useEffect(() => {
    if (categorias.length > 0 && categoriaSelecionada === null) {
      setCategoriaSelecionada(categorias[0].nome);
    }
  }, [categorias, categoriaSelecionada]);

  let produtosComponent

  if (usuario.token !== "") {

    produtosComponent = (

      <div className='container mx-auto py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {todosOsProdutos.map((produto) => (
          <CardProdutoAdmin key={produto.id} produto={produto} />
        ))}
      </div>
    )
  } else {
    produtosComponent = (

    <div className='container mx-auto py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {todosOsProdutos.map((produto) => (
        <CardProdutoCliente key={produto.id} produto={produto} onAdicionar={adicionarAoCarrinho} />
      ))}
    </div>
    )
  }

  return (
    <>
      <div className='pt-60 min-h-[95vh]'>
        <div className='container mx-auto p-4 flex justify-evenly gap-4 rounded-xl bg-rose-500'>
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => handleCategoriaClick(categoria.nome)}
              className={`bg-rose-100 px-2 py-1 rounded-lg hover:bg-rose-800 hover:text-rose-100 ${categoria.nome === categoriaSelecionada ? 'font-bold' : ''}`}
            >
              {categoria.nome}
            </button>
          ))}
        </div>

        {produtosComponent}
      </div>
    </>
  )
}

export default Produtos;
