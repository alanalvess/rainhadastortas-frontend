import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardCarrinho from '../../components/produtos/cardCarrinho/CardCarrinho';
import { Trash } from '@phosphor-icons/react';
import Produto from '../../models/Produto';
import { AuthContext } from '../../contexts/AuthContext';

const Carrinho = () => {
  let carrinhoComponent;
  let linkWhatsapp = '';
  
  const CELULAR_EMPRESA = '5511984982465';

  const { produtos, setProdutos, removerProduto } = useContext(AuthContext)

  function calcularTotalCarrinho(produtos: Produto[]) {
    const totalCarrinho = produtos.reduce((total, produto) => {
      return total + (produto.total || 0);
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
    texto += `\nTotal do pedido: R$ ${calcularTotalCarrinho(produtos).toFixed(2).replace('.', ',')}`;

    const mensagemCodificada = encodeURI(texto);
    linkWhatsapp = `https://api.whatsapp.com/send?phone=${CELULAR_EMPRESA}&text=${mensagemCodificada}`;

    return linkWhatsapp;
  }

  useEffect(() => {
    const produtosSalvos = localStorage.getItem('produtosNoCarrinho');
    if (produtosSalvos) {
      const produtosConvertidos = JSON.parse(produtosSalvos) as Produto[];
      setProdutos(produtosConvertidos);
    }
  }, []);

  if (produtos.length > 0) {
    carrinhoComponent = (
      <div className=' pt-60 pb-10 bg-rose-50'>
        <div className='px-20 py-10 mx-40 mb-10 rounded-3xl bg-rose-300'>
          <h2 className='bg-rose-700 rounded-xl p-10 text-white font-bold text-2xl text-center uppercase '>Meu Carrinho</h2>

          {produtos.map((produto) => (
            <div className='flex' key={produto.id}>
              <div className='flex-grow'>
                <CardCarrinho produto={produto} />
              </div>
              <button className='p-4 bg-rose-400 m-4 ml-0 rounded-r-xl text-rose-950' onClick={() => removerProduto(produto.id)}>
                <Trash size={30} />
              </button>
            </div>
          ))}

          <hr className="border-rose-800 my-10 w-full" />

          <div className='p-0 rounded-xl m-5 text-right'>
            <p className='font-bold'>
              Valor total do carrinho:
              <span className=' text-white mx-2 '>
                R$ {calcularTotalCarrinho(produtos).toFixed(2).replace('.', ',')}
              </span>
            </p>

            <Link to={urlWhatsapp()} target="_blank" rel="noopener noreferrer">
              <button className='p-4 bg-rose-700 text-white font-bold my-5 rounded-2xl hover:bg-rose-900'>Finalizar Pedido</button>
            </Link>
          </div>

        </div>
      </div>
    );

  } else {
    carrinhoComponent = (
      <div className=' pt-60 pb-10 bg-rose-50'>
        <div className='px-20 py-10 mx-40 mb-10 rounded-3xl bg-rose-300'>
          <h2 className='bg-rose-700 rounded-xl p-10 text-white font-bold text-2xl text-center uppercase '>Carrinho Vazio</h2>
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