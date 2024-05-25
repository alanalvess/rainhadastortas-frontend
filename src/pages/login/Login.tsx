import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'

import { AuthContext } from '../../contexts/AuthContext'

import UsuarioLogin from '../../models/UsuarioLogin'

function Login() {

  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/produtos');
    }
  }, [usuario]);

  return (
    <>
      <div className="flex justify-center lg:mx-[20vw] bg-rose-100  font-bold h-screen place-items-center">
        <form className="flex justify-center items-center flex-col w-1/2 gap-4" onSubmit={login}>
          <h2 className="text-rose-900 text-5xl ">Entrar</h2>
          
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-rose-700 rounded p-2"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-rose-700 rounded p-2"
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          
          <button type='submit' className="rounded bg-rose-400 hover:bg-rose-900 text-white w-1/2 py-2 flex justify-center">
            {isLoading ?
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              /> : <span>Entrar</span>
            }
          </button>

          <hr className="border-rose-800 w-full" />

          {/* <p>
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" className="text-rose-800 hover:underline">
              Cadastre-se
            </Link>
          </p> */}
        </form>
      </div>
    </>
  );
}

export default Login;