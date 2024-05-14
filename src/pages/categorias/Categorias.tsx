import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DNA } from 'react-loader-spinner'

import { AuthContext } from '../../contexts/AuthContext'
import { Toast, ToastAlerta } from '../../utils/ToastAlerta'
import { buscar } from '../../services/Service'

import Categoria from '../../models/Categoria'
import CardCategorias from '../../components/categorias/cardCategorias/CardCategorias'

function Categorias() {

  const navigate = useNavigate();

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarCategorias() {
    try {
      await buscar('/categorias', setCategorias, { headers: { Authorization: token } });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        ToastAlerta('O token expirou, favor logar novamente', Toast.Warning);
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', Toast.Info);
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  return (
    <>
      {categorias.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}

      <div className="flex justify-center pt-60 min-h-[95vh]">
        <div className="container flex flex-col m-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-4">
            {categorias.map((categoria) => (
              <>
                <CardCategorias key={categoria.id} categoria={categoria} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Categorias;