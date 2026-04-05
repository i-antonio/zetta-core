import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Produto } from '../../models/models';
import { ButtonComponent } from '../button/button.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, ProductCardComponent],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  @ViewChild('editform') editForm!: ElementRef;

  produtos: Produto[] = [];
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;
  editando = false; 
  produtoEditando: Produto | null = null;

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

  abrirEdicao(produto : Produto) : void {
    this.produtoEditando = { ...produto};
    this.editando = true;

    setTimeout(() => {
    this.editForm.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}
  cancelarEdicao(): void {
    this.editando = false;
    this.produtoEditando = null;
  }
  salvarEdicao(): void {
  if (!this.produtoEditando || !this.produtoEditando.id) return;

  this.apiService.updateProduto(this.produtoEditando.id, this.produtoEditando).subscribe({
    next: () => {
      this.successMessage = '✅ Produto atualizado com sucesso!';
      this.cancelarEdicao();
      this.loadProdutos();
      setTimeout(() => this.successMessage = null, 3000);
    },
    error: () => { this.error = 'Erro ao atualizar produto.'; }
  })
  }
}

