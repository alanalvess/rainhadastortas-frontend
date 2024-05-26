import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'

import { AuthContext } from '../../../contexts/AuthContext'
import { Toast, ToastAlerta } from '../../../utils/ToastAlerta'
import { buscar, deletar } from '../../../services/Service'

import Produto from '../../../models/Produto'

function DeletarProduto() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produto, setProduto] = useState<Produto>({} as Produto);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto, { headers: { Authorization: token } });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        ToastAlerta('O token expirou, favor logar novamente', Toast.Error);
        handleLogout();
      }
    }
  }

  async function deletarProduto() {
    setIsLoading(true);

    try {
      await deletar(`/produtos/${id}`, { headers: { Authorization: token } });
      ToastAlerta('Produto apagado', Toast.Sucess);
    } catch (error) {
      ToastAlerta('Erro ao apagar o Produto', Toast.Error);
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/produtos");
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', Toast.Warning);
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  return (
    <>
      <div className='pt-40'>

        <div className=' lg:w-1/3 mx-auto lg:bg-white lg:border border-gray-200 rounded-lg lg:shadow-lg '>
          <h4 className='text-2xl text-center my-4'>Deletar Produto?</h4>

          <div className=' bg-rose-100 flex flex-col rounded-xl overflow-auto justify-between m-10'>

            <div className=" flex ">
              <img className=" lg:max-w-[200px] rounded-l-xl xs:max-w-[150px]" src={produto.imagem} alt="Imagem do Sabor" />

              <div>
                <h4 className='lg:text-xl xs:text-lg font-semibold uppercase p-2 text-rose-800'>{produto.nome}</h4>
                <p className='lg:text-lg xs:text-sm p-2'>{produto.descricao}</p>
                <div className="flex">
                  <button className='text-rose-100 bg-rose-400 hover:bg-rose-700 w-full p-2' onClick={retornar}>Não</button>

                  <button className='w-full text-rose-100 bg-rose-500 hover:bg-rose-700 flex items-center justify-center ' onClick={deletarProduto}>
                    {isLoading ?
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                      /> :
                      <span>Sim</span>
                    }
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default DeletarProduto;