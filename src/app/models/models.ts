export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  profissao: string;
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
}

export interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  autor: string;
  data: string;
}
