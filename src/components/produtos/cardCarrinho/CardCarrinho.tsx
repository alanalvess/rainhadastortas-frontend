import { useEffect, useState } from 'react'
import { Minus, Plus } from '@phosphor-icons/react';

import Produto from '../../../models/Produto'

interface CardCarrinhoProps {
  produto: Produto;
  onAdicionar: (produto: Produto, total: number) => void;
  onRemover: (produto: Produto) => void;
}

function CardCarrinho({ produto, onAdicionar, onRemover }: CardCarrinhoProps) {

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(produto.quantidade * produto.valor)
  }, [produto.quantidade, produto.valor]);

  return (
    <div className='flex flex-col rounded-l-xl justify-between m-4 mr-0 p-4 bg-rose-100 overflow-auto'>
      <div>
        <div className=' flex '>
          <img className="max-h-[100px] max-w-[100px] rounded-lg" src={produto.imagem} alt="Imagem do Sabor" />
          <div className='mx-4'>
            <h3 className='text-xs font-bold text-start rounded-lg py-1 px-2 bg-rose-700 text-rose-100 uppercase '>{produto.nome}</h3>

            <p className='text-sm px-2 py-1'>Preço: R$ {produto.valor.toFixed(2).replace('.', ',')}</p>
            <p className='text-sm px-2 py-1'>Total: R$ {total.toFixed(2).replace('.', ',')}</p>

            <div className="flex max-h-[30px]">
              <div className=''>
                <div className=" px-2 py-1 mx-1 text-white bg-rose-400  flex items-center justify-center rounded-lg text-center add-carrinho">
                  <button className="btn-menos cursor-pointer px-2 " onClick={() => onRemover(produto)}>
                    <Minus size={15} />
                  </button>

                  <span className="add-numero-itens text-center px-2" >{produto.quantidade}</span>

                  <button className="btn-mais cursor-pointer px-2" onClick={() => onAdicionar(produto, total)}>
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardCarrinho;