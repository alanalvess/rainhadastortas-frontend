import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Toast, ToastAlerta } from '../../utils/ToastAlerta'
import { cadastrarUsuario } from '../../services/Service'

import Usuario from '../../models/Usuario'

function Cadastro() {

  const navigate = useNavigate();

  const [confirmaSenha, setConfirmaSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: ''
  });

  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: ''
  });

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResposta);
        ToastAlerta('Usuário cadastrado', Toast.Sucess);
      } catch (error) {
        ToastAlerta('Erro ao cadastrar usuário', Toast.Error);
      }

    } else {
      ToastAlerta('Dados inconsistentes. Verifique as informações de cadastro.', Toast.Error);
      setUsuario({ ...usuario, senha: "" });
      setConfirmaSenha("");
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  function retornar() {
    navigate('/login');
  }

  useEffect(() => {
    if (usuarioResposta.id !== 0) {
      retornar();
    }
  }, [usuarioResposta]);

  return (
    <>
      <div className='pt-40'>

        <div className="flex justify-center lg:mx-[20vw] font-bold bg-white border border-gray-200 rounded-lg shadow-lg">
          <form className='flex justify-center items-center flex-col w-2/3 gap-3 py-10' onSubmit={cadastrarNovoUsuario}>
            <h2 className='text-rose-900 text-5xl'>Cadastrar</h2>

            <div className="flex flex-col w-full">
              <label htmlFor="nome">Nome</label>
              <input
                className="border-2 border-slate-700 rounded p-2 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                type="text"
                placeholder="Nome"
                name="nome"
                id="nome"
                value={usuario.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="usuario">Usuario</label>
              <input
                className="border-2 border-slate-700 rounded p-2 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                type="text"
                placeholder="Usuario"
                name="usuario"
                id="usuario"
                value={usuario.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="senha">Senha</label>
              <input
                className="border-2 border-slate-700 rounded p-2 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                type="password"
                placeholder="Senha"
                name="senha"
                id="senha"
                value={usuario.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <input
                className="border-2 border-slate-700 rounded p-2 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                type="password"
                placeholder="Confirmar Senha"
                name="confirmarSenha"
                id="confirmarSenha"
                value={confirmaSenha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
              />
            </div>

            <div className="flex justify-around w-full gap-8">
              <button className='rounded text-white bg-rose-400 hover:bg-rose-900 w-1/2 py-2' type='submit'>
                Cadastrar
              </button>
            </div>

            <hr className="border-rose-800 w-full" />

            <p>
              Já tem uma conta?{' '}
              <Link to="/login" className="text-rose-800 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Cadastro;