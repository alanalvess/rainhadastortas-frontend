import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { RotatingLines } from 'react-loader-spinner'

import { AuthContext } from '../../../contexts/AuthContext'
import { Toast, ToastAlerta } from '../../../utils/ToastAlerta'
import { buscar, deletar } from '../../../services/Service'

import Categoria from '../../../models/Categoria'

function DeletarCategoria() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, { headers: { Authorization: token } });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        ToastAlerta('O token expirou, favor logar novamente', Toast.Error);
        handleLogout();
      }
    }
  }

  async function deletarCategoria() {
    setIsLoading(true);

    try {
      await deletar(`/categorias/${id}`, { headers: { Authorization: token } });
      ToastAlerta('Categoria apagada', Toast.Sucess);
    } catch (error) {
      ToastAlerta('Erro ao apagar a Categoria', Toast.Error);
    }

    retornar();
  }

  function retornar() {
    navigate("/categorias");
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
    <div className='container w-1/3 mx-auto pt-60 p-4'>
      <h1 className='text-4xl text-center my-4'>Deletar categoria</h1>

      <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar o categoria a seguir?</p>

      <div className='border flex flex-col rounded-2xl overflow-auto justify-between'>
        <h4 className='py-2 px-6 bg-rose-600 text-white font-bold text-2xl'>Categoria</h4>
        <p className='p-8 text-3xl bg-rose-200 h-full'>{categoria.nome}</p>

        <div className="flex">
          <button className='text-rose-100 bg-rose-400 hover:bg-rose-700 w-full py-2' onClick={retornar}>Não</button>

          <button className='w-full text-rose-100 bg-rose-500 hover:bg-rose-700 flex items-center justify-center' onClick={deletarCategoria}>
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
  )
}

export default DeletarCategoria;