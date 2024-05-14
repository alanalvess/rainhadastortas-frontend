import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

import { AuthContext } from '../../../contexts/AuthContext';
import { Toast, ToastAlerta } from '../../../utils/ToastAlerta';
import { atualizar, buscar, cadastrar } from '../../../services/Service';

import Categoria from '../../../models/Categoria';

function FormularioCategoria() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria, { headers: { Authorization: token } });
  }

  async function atualizarCategoria() {
    await atualizar(`/categorias`, categoria, setCategoria, { headers: { Authorization: token } });
    ToastAlerta('Categoria atualizado com sucesso', Toast.Sucess);
    retornar();
  }

  async function cadastrarCategoria() {
    await cadastrar(`/categorias`, categoria, setCategoria, { headers: { Authorization: token } });
    ToastAlerta('Categoria cadastrado com sucesso', Toast.Sucess);
    retornar();
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizarCategoria();
      } else {
        await cadastrarCategoria();
      }
    } catch (error: any) {
      handleCategoriaError(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCategoriaError(error: any) {
    if (error.toString().includes('403')) {
      ToastAlerta('O token expirou, favor logar novamente', Toast.Warning);
      handleLogout();
    } else {
      ToastAlerta('Erro ao cadastrar/atualizar a Categoria', Toast.Error);
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })
  }

  function retornar() {
    navigate("/categorias");
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', Toast.Warning);
      navigate('/login');
    }
  }, [token]);

  return (
    <div className="container flex flex-col mx-auto items-center justify-center pt-60 pb-20">
      <h1 className="text-4xl text-center my-8 text-rose-900">
        {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaCategoria}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome da categoria</label>
          <input
            className="border-2 border-rose-700 rounded p-2"
            type="text"
            placeholder="nome"
            name='nome'
            value={categoria.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            required
          />
        </div>

        <button
          disabled={id !== undefined && categoria.nome === ''}
          className="rounded text-rose-100 bg-rose-500 hover:bg-rose-700 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
        >
          {isLoading ?
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
            id !== undefined ? <span>Editar</span> : <span>Cadastrar</span>
          }
        </button>
      </form>
    </div>
  );
}

export default FormularioCategoria;