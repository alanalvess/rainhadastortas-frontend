import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardCarrinho from '../../components/produtos/cardCarrinho/CardCarrinho';
import { Trash } from '@phosphor-icons/react';
import Produto from '../../models/Produto';
import { Toast, ToastAlerta } from '../../utils/ToastAlerta';




// export function calcularQuantidade(): number {
//   return produtosNoCarrinho.reduce((quantidade, produto) => quantidade + produto.quantidade, 0);
// }


const Carrinho = () => {
  let carrinhoComponent;
  let linkWhatsapp = '';
  
  const CELULAR_EMPRESA = '5511984982465';

  const [produtosNoCarrinho, setProdutosNoCarrinho] = useState<Produto[]>([]);

  function atualizarQuantidade(produto: Produto, quantidade: number) {
    const produtosAtualizados = produtosNoCarrinho.map((p) =>
      p.id === produto.id ? { ...p, quantidade: p.quantidade + quantidade, total: (p.quantidade + quantidade) * p.valor } : p
    );

    setProdutosNoCarrinho(produtosAtualizados);
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

    if (produtoExistente) {
      atualizarQuantidade(produtoExistente, 1);
    }
    else {
      adicionarNovoProduto(produto);
    }

    salvarNoLocalStorage();
  }

  function diminuirDoCarrinho(produto: Produto) {
    const produtoExistente = produtosNoCarrinho.find((p) => p.id === produto.id);

    if (produtoExistente) {
      if (produtoExistente.quantidade > 1) {
        atualizarQuantidade(produtoExistente, -1);
      } else {
        ToastAlerta('Quantidade mínima de item', Toast.Info);
      }
    }

    salvarNoLocalStorage();
  }

  function calcularTotal() {
    return produtosNoCarrinho.reduce((total, produto) => total + produto.total, 0);
  }




  function removerItem(id: number) {
    const novosProdutos = produtosNoCarrinho.filter((produto) => produto.id !== id);
    setProdutosNoCarrinho(novosProdutos);
    localStorage.setItem('produtosNoCarrinho', JSON.stringify(novosProdutos));
  }

  function urlWhatsapp() {
    let itens = '';
    let texto = `Olá! Gostaria de fazer um pedido:`;

    produtosNoCarrinho.forEach((produto) => {
      itens += `${produto.nome}: ${produto.quantidade}x R$ ${produto.valor.toFixed(2).replace('.', ',')} = R$ ${produto.total.toFixed(2).replace('.', ',')}\n`;
    });

    texto += `\nItens do pedido:\n\n${itens}`;
    texto += `\nTotal do pedido: R$ ${calcularTotal().toFixed(2).replace('.', ',')}`;

    const mensagemCodificada = encodeURI(texto);
    linkWhatsapp = `https://api.whatsapp.com/send?phone=${CELULAR_EMPRESA}&text=${mensagemCodificada}`;

    return linkWhatsapp;
  }

  useEffect(() => {
    const produtosSalvos = localStorage.getItem('produtosNoCarrinho');
    if (produtosSalvos) {
      const produtosConvertidos = JSON.parse(produtosSalvos) as Produto[];
      setProdutosNoCarrinho(produtosConvertidos);
    }
  }, []);

  if (produtosNoCarrinho.length > 0) {
    carrinhoComponent = (
      <div className=' pt-60 pb-10 bg-rose-50'>
        <div className='px-20 py-10 mx-40 mb-10 rounded-3xl bg-rose-300'>
          <h2 className='bg-rose-700 rounded-xl p-10 text-white font-bold text-2xl text-center uppercase '>Meu Carrinho</h2>



          {/* {produtosNoCarrinho.map((produto) => (
            <div className='flex ' key={produto.id}>
            <CardCarrinho produto={produto} onAdicionar={adicionarAoCarrinho} onRemover={diminuirDoCarrinho} />
            <button className='' onClick={() => removerItem(produto.id)}>
            <Trash size={30}/>
            </button>
            </div>
          ))} */}

          {produtosNoCarrinho.map((produto) => (
            <div className='flex' key={produto.id}>
              <div className='flex-grow'>
                <CardCarrinho produto={produto} onAdicionar={adicionarAoCarrinho} onRemover={diminuirDoCarrinho} />
              </div>
              <button className='p-4 bg-rose-400 m-4 ml-0 rounded-r-xl text-rose-950' onClick={() => removerItem(produto.id)}>
                <Trash size={30} />
              </button>
            </div>
          ))}

          <hr className="border-rose-800 my-10 w-full" />


          <div className='p-0 rounded-xl m-5 text-right'>
            <p className='font-bold'>
              Valor total do carrinho:
              <span className=' text-white mx-2 '>
                R$ {calcularTotal().toFixed(2).replace('.', ',')}
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
      {/* <div className='relative'>

        <span className="absolute z-50 right-32 bg-rose-950 top-16 inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-rose-50 rounded-full">
          {calcularQuantidade()}

        </span>
      </div> */}
      {carrinhoComponent}

    </>
  )
}

export default Carrinho;