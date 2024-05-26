import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Trash } from '@phosphor-icons/react';

import { AuthContext } from '../../contexts/AuthContext';

import CardCarrinho from '../../components/produtos/cardCarrinho/CardCarrinho';

const Carrinho = () => {
  let carrinhoComponent;
  let linkWhatsapp = '';

  const CELULAR_EMPRESA = '5511984982465';

  const { produtos, removerProduto } = useContext(AuthContext);

  function calcularTotalCarrinho() {
    const totalCarrinho = produtos.reduce((total, produto) => {
      return total + produto.total;
    }, 0);
    return totalCarrinho;
  }

  function urlWhatsapp() {
    let itens = '';
    let texto = `Olá! Gostaria de fazer um pedido:`;

    produtos.map((produto) => {
      itens += `${produto.nome}: ${produto.quantidade}x R$ ${produto.valor} = R$ ${produto.total}\n`;
    });

    texto += `\nItens do pedido:\n\n${itens}`;
    texto += `\nTotal do pedido: R$ ${calcularTotalCarrinho().toFixed(2).replace('.', ',')}`;

    const mensagemCodificada = encodeURI(texto);
    linkWhatsapp = `https://api.whatsapp.com/send?phone=${CELULAR_EMPRESA}&text=${mensagemCodificada}`;

    return linkWhatsapp;
  }



  if (produtos.length > 0) {
    carrinhoComponent = (
      <div className=' pt-40 pb-10 bg-rose-50'>
        <div className='sm:px-20 sm:py-10 sm:mx-40 sm:mb-10 rounded-xl bg-rose-300 xs:px-4 xs:py-4 xs:mx-10'>
          <h2 className='bg-rose-700 rounded-xl sm:p-10 text-white font-bold text-xl text-center uppercase xs:p-5'>Meu Carrinho</h2>

          {produtos.map((produto) => (
            <div className='flex' key={produto.id}>
              <div className='flex-grow'>
                <CardCarrinho produto={produto} />
              </div>
              <button className='p-2 lg:p-4 bg-rose-400 m-4 ml-0 rounded-r-xl text-rose-950' onClick={() => removerProduto(produto.id)}>
                <Trash size={30} className='' />
              </button>
            </div>
          ))}


          <div className='p-0 rounded-xl m-5 text-right'>
            <hr className="border-rose-800 my-5 w-full" />

            <p className='font-bold'>
              Valor total do carrinho:
            </p>
            <p className=' text-white font-bold'>
              R$ {calcularTotalCarrinho().toFixed(2).replace('.', ',')}
            </p>

            <hr className="border-rose-800 my-5 w-full" />

            <Link to={urlWhatsapp()} target="_blank" rel="noopener noreferrer">
              <button className='p-4 bg-rose-700 text-white font-bold my-5 rounded-2xl hover:bg-rose-900'>Finalizar Pedido</button>
            </Link>
          </div>

        </div>
      </div>
    );

  } else {
    carrinhoComponent = (
      <div className=' pt-40 pb-10 bg-rose-50'>
        <div className=' lg:px-20 lg:py-10 lg:mx-40 lg:mb-10 rounded-3xl bg-rose-300 xs:bg-rose-50'>
          <h2 className='bg-rose-700 rounded-xl p-10 text-white font-bold text-2xl text-center uppercase xs:mx-5'>Carrinho Vazio</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      {carrinhoComponent}
    </>
  )
}

export default Carrinho;