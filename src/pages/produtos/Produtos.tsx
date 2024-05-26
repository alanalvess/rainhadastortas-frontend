import { useContext, useEffect, useState } from 'react'
import { DNA } from 'react-loader-spinner'

import { AuthContext } from '../../contexts/AuthContext'
import { Toast, ToastAlerta } from '../../utils/ToastAlerta'
import { buscar } from '../../services/Service'

import Categoria from '../../models/Categoria'
import Produto from '../../models/Produto'
import CardProduto from '../../components/produtos/cardProduto/CardProduto'
import { Button, Dropdown, ListGroup, ListGroupItem } from 'flowbite-react'
import { Link } from 'react-router-dom'

function Produtos() {

  const { usuario } = useContext(AuthContext);

  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);

  const categoriasOrdenadas = categorias.sort((a, b) => a.nome.localeCompare(b.nome));

  const produtosFiltrados = produtos.filter((produto) => produto.categoria?.nome === categoriaSelecionada);
  const produtosFiltradosOrdenados = produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
  const produtosFiltradosDisponiveis = produtosFiltradosOrdenados.filter((produto) => produto.disponivel);
  const produtosFiltradosIndisponiveis = produtosFiltradosOrdenados.filter((produto) => !produto.disponivel);
  const todosProdutosFiltrados = [...produtosFiltradosDisponiveis, ...produtosFiltradosIndisponiveis];

  const produtosOrdenados = produtos.sort((a, b) => a.nome.localeCompare(b.nome));
  const produtosDisponiveis = produtosOrdenados.filter((produto) => produto.disponivel);
  const produtosIndisponiveis = produtosOrdenados.filter((produto) => !produto.disponivel);
  const todosProdutos = [...produtosDisponiveis, ...produtosIndisponiveis];

  const produtosParaExibir = categoriaSelecionada === null ? todosProdutos : todosProdutosFiltrados;

  async function buscarCategorias() {
    try {
      await buscar('/categorias/all', setCategorias);
    } catch (error: any) {
      ToastAlerta('Não há categorias para exibir', Toast.Info);
    }
  }

  async function buscarProdutos() {
    try {
      await buscar('/produtos/all', setProdutos);
    } catch (error: any) {
      ToastAlerta('Não há produtos para exibir', Toast.Info);
    }
  }

  function handleCategoriaClick(categoriaNome: string) {
    if (categoriaNome === categoriaSelecionada) {
      setCategoriaSelecionada(null)
    } else {
      setCategoriaSelecionada(categoriaNome)
    }
  }

  useEffect(() => {
    buscarCategorias();
    buscarProdutos();
  }, [categoriaSelecionada, categorias.length]);

  let produtosComponent;
  let listComponent;

  if (usuario.token !== "") {
    produtosComponent = (
      <div>
        <div className="flex flex-wrap gap-3 m-5">
          <Button >
            <Link to={'/cadastroCategoria'}>Cadastrar Categoria</Link>
          </Button>
          <Button>
            <Link to={'/cadastroProduto'}>Cadastrar Produto</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (usuario.token !== "") {
    listComponent = (
      <ListGroup className="sm:w-48 m-4 xs:w-32">
        {categoriasOrdenadas.map((categoria) => (
          <ListGroupItem
            key={categoria.id}
            onClick={() => handleCategoriaClick(categoria.nome)}
            className={`${categoria.nome === categoriaSelecionada ? 'font-bold' : ''}`}
            active={categoria.nome === categoriaSelecionada}
          >
            <Dropdown label="" inline>
              <Dropdown.Item>
                <Link to={`/editarCategoria/${categoria.id}`} className='w-full'>Editar</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Link to={`/deletarCategoria/${categoria.id}`} className='w-full '>Deletar</Link>
              </Dropdown.Item>
            </Dropdown>

            {categoria.nome}
          </ListGroupItem>
        ))}

        {produtosComponent}
      </ListGroup>
    )
  } else {
    listComponent = (
      <ListGroup className="sm:w-48 m-4 xs:w-32">
        {categoriasOrdenadas.map((categoria) => (
          <ListGroupItem
            key={categoria.id}
            onClick={() => handleCategoriaClick(categoria.nome)}
            className={`${categoria.nome === categoriaSelecionada ? 'font-bold' : ''}`}
            active={categoria.nome === categoriaSelecionada}
          >
            {categoria.nome}
          </ListGroupItem>
        ))}

        {produtosComponent}
      </ListGroup>
    )
  }




  return (
    <>
      <div className='pt-40 flex-col min-h-[95vh]  '>

        <div className='flex'>


          <div className='sm:min-w-[25vw] xs:min-w-[10vw] '>
            <div className="flex justify-center">

              {listComponent}

            </div>
          </div>

          <div className='mx-6'>
            {produtos.length === 0 && (
              <DNA
                visible={true}
                height="200"
                width="200"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper mx-auto"
              />
            )}

            <div className='mx-auto py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {produtosParaExibir.length > 0 ? (
                produtosParaExibir.map((produto) => (
                  <CardProduto key={produto.id} produto={produto} />
                ))
              ) : (
                <p className="text-center col-span-full">Não há produtos</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Produtos;
