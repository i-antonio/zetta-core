export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  preco: number;
  imagem_url: string;
  marca: string;
  desconto: number;
  estoque: number;
  status: string;
  acessorios: string[];
}
