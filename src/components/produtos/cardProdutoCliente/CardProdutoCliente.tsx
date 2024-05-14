import { ShoppingCart } from '@phosphor-icons/react';

import Produto from '../../../models/Produto'

interface CardProdutoClienteProps {
  produto: Produto;
  onAdicionar: (produto: Produto) => void;
}

function CardProdutoCliente({ produto, onAdicionar }: CardProdutoClienteProps) {

  return (
    <div className='flex flex-col rounded-xl overflow-auto justify-between bg-rose-200'>

      <div>
        <div className="flex w-full bg-rose-700 text-white py-3 px-4 items-center gap-4"></div>

        <div className='p-4'>
          <h4 className='text-xl font-semibold uppercase p-2 text-rose-800'>{produto.nome}</h4>
          <img className="h-auto max-w-full rounded-lg" src={produto.imagem} alt="Imagem do Sabor" />
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
                  onClick={() => onAdicionar(produto)}
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
  );

}

export default CardProdutoCliente;