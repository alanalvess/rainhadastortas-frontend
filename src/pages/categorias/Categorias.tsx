import { useEffect, useState } from 'react'
import { DNA } from 'react-loader-spinner'

import { Toast, ToastAlerta } from '../../utils/ToastAlerta'
import { buscar } from '../../services/Service'

import Categoria from '../../models/Categoria'
import CardCategorias from '../../components/categorias/cardCategorias/CardCategorias'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

function Categorias() {

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  async function buscarCategorias() {
    try {
      await buscar('/categorias/all', setCategorias);
    } catch (error: any) {
      if (error.toString().includes('403')) {
        ToastAlerta('Não há categorias para exibir', Toast.Info);
      }
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  return (
    <>
      <div className="flex justify-center pt-60 min-h-[95vh]">
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
        <div>
          <div className="flex flex-wrap gap-2 m-5">
            <Button>
              <Link to={'/cadastroCategoria'}>Cadastrar Categoria</Link>
            </Button>
          </div>
          <div className="flex flex-col m-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-4">

              {categorias.map((categoria) => (
                <>
                  <CardCategorias key={categoria.id} categoria={categoria} />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Categorias;