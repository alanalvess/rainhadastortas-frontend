import { Link } from 'react-router-dom'

import Produto from '../../../models/Produto'
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { ShoppingCart, Trash, X } from '@phosphor-icons/react';

import { Button, Card } from "flowbite-react";
import { HiShoppingCart, HiXCircle } from "react-icons/hi";

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
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-3 text-sm text-center text-white font-bold'>
          {produto.disponivel
            ? <p className='py-1 bg-green-600 rounded-lg '>DISPONÍVEL</p>
            : <p className='py-1 bg-red-600 rounded-lg '>INDISPONÍVEL</p>
          }
        </div>

        <Link to={`/editarProduto/${produto.id}`} className='text-white col-span-2'>
          <Button color="pink" className=' w-full ' >
            Editar
          </Button>
        </Link>

        <Link to={`/deletarProduto/${produto.id}`} className='col-span-1'>
          <Button color="failure" className=' w-full text-white hover:bg-rose-700' >
            <Trash size={20} />
          </Button>
        </Link>

      </div>
    )
  } else {
    cardProdutoComponent = (

      <div className='text-white w-full '>
        {produto.disponivel ?
          (
            <Button onClick={handleAdicionar} color="pink" className='w-full' >
              <HiShoppingCart className="mr-2 h-5 w-5" />
              <span>Adicionar</span>
            </Button>
          ) : (
            <Button className='w-full flex itens-center' color="pink" disabled>
              <HiXCircle className="mr-2 h-5 w-5" />
              <span>Indisponível</span>
            </Button>
          )
        }
      </div>
    )
  }

  return (
    <>
      <Card
        className="max-w-xs xs:min-w-40"
        imgAlt="Imagem do Produto"
        imgSrc={produto.imagem}
      >

        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {produto.nome}
        </h5>

        <div >
          <p className="text-sm font-bold text-gray-700 dark:text-gray-400">
            R$ {produto.valor.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
            {produto.descricao}
          </p>
        </div>

        <div className='flex gap-4 justify-between'>
          {cardProdutoComponent}
        </div>
      </Card>

    </>
  )
}

export default CardProduto;