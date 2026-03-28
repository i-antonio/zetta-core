import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Produto } from '../../models/models';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;

  newProduto: Produto = {
    nome: '',
    descricao: '',
    categoria: '',
    preco: 0,
    imagem_url: '',
    marca: '',
    desconto: 0,
    estoque: 0,
    status: '',
    acessorios: []
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar produtos. Certifique-se de que o JSON Server está rodando.';
        this.loading = false;
        console.error('Erro:', err);
      }
    });
  }

  onSubmit(): void {
    if (!this.newProduto.nome || !this.newProduto.categoria || this.newProduto.preco <= 0
      || this.newProduto.estoque < 0 || !this.newProduto.status) return;

    this.apiService.createProduto(this.newProduto).subscribe({
      next: () => {
        this.successMessage = '✅ Produto criado com sucesso!';
        this.newProduto = {
          nome: '',
          descricao: '',
          categoria: '',
          preco: 0,
          imagem_url: '',
          marca: '',
          desconto: 0,
          estoque: 0,
          status: '',
          acessorios: []
        };
        this.loadProdutos();
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (err) => {
        this.error = 'Erro ao criar produto.';
        console.error('Erro:', err);
      }
    });
  }

  deleteProduto(id: number | undefined): void {
    if (!id || !confirm('Tem certeza que deseja excluir este produto?')) return;

    this.apiService.deleteProduto(id).subscribe({
      next: () => this.loadProdutos(),
      error: (err) => {
        this.error = 'Erro ao excluir produto.';
        console.error('Erro:', err);
      }
    });
  }
}
