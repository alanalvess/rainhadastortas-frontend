import { Link } from 'react-router-dom'

import Produto from '../../../models/Produto'
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { ShoppingCart } from '@phosphor-icons/react';

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {

  let cardProdutoComponent;

  const { usuario, adicionarProduto } = useContext(AuthContext);

  const handleAdicionar = () => {
    adicionarProduto({ ...produto });
  }

  if (usuario.token !== '') {

    cardProdutoComponent = (
      <div className='bg-rose-200  flex flex-col rounded-xl overflow-auto justify-between'>
        <div>
          <div className="flex w-full bg-rose-700 text-white py-3 px-4 items-center gap-4"></div>

          <div className='p-10 '>
            <h4 className='text-xl font-semibold uppercase p-2 text-rose-800'>{produto.nome}</h4>
            <img className="max-h-40 max-w-full rounded-xl" src={produto.imagem} alt="Imagem do Sabor" />

            <p className='text-lg font-semibold py-4'>Preço: R$ {produto.valor.toFixed(2).replace('.', ',')}</p>
            <p className='text-lg py-2'>{produto.descricao}</p>
            
              {produto.disponivel
                ? <p className='text-lg mb-0 py-2 text-green-600 font-bold'>Disponível</p>

                : <p className='text-lg mb-0 py-2 text-red-600 font-bold'>Indisponível</p>
              }
          </div>
        </div>

        <div className="flex">
          <Link to={`/editarProduto/${produto.id}`} className='w-full text-white bg-rose-400 hover:bg-rose-700 flex items-center justify-center py-2'>
            <button>Editar</button>
          </Link>

          <Link to={`/deletarProduto/${produto.id}`} className='text-white bg-rose-500 hover:bg-rose-700 w-full flex items-center justify-center'>
            <button>Deletar</button>
          </Link>
        </div>
      </div>
    )
  } else {
    cardProdutoComponent = (
      <div className='flex flex-col rounded-xl overflow-auto justify-between bg-rose-200'>

        <div>
          <div className="flex w-full bg-rose-700 text-white py-3 px-4 items-center gap-4"></div>

          <div className='p-4'>
            <h4 className='text-xl font-semibold uppercase p-2 text-rose-800'>{produto.nome}</h4>
            <img className="max-h-40 max-w-full rounded-lg" src={produto.imagem} alt="Imagem do Sabor" />
            <p className='text-lg font-semibold py-4'>Preço: R$ {produto.valor.toFixed(2).replace('.', ',')}</p>
            <p className='text-lg py-2'>{produto.descricao}</p>
          </div>
        </div>

        <div className="flex">

          <div className='text-white bg-rose-500 hover:bg-rose-700 w-full flex items-center justify-center rounded-xl m-3'>
            {produto.disponivel ?
              (
                <>
                  <button
                    title='add'
                    className='flex items-center gap-3 p-2'
                    onClick={handleAdicionar}
                  >
                    Adicionar ao carrinho
                    <ShoppingCart size={30} weight='fill' />
                  </button>
                </>
              ) : (
                <>
                  <p className=' p-2'>Produto indisponível</p>
                </>
              )
            }
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {cardProdutoComponent}
    </>
  )
}

export default CardProduto;