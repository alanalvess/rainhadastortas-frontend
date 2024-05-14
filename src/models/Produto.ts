import Categoria from './Categoria';

export default interface Produto {
  id: number;
  nome: string;
  valor: number;
  imagem: string;
  descricao: string;
  disponivel: boolean;
  quantidade: number;
  total: number;
  categoria: Categoria | null;
}