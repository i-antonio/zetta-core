import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  produto: any = {};
  loading: boolean = true;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.carregarProduto(id);
    
    this.route.paramMap.subscribe(params => {
      const novoId = params.get('id');
      if (novoId) {
        this.carregarProduto(novoId);
      }
    });
  }

  carregarProduto(id: string | null) {
    this.loading = true;
    this.error = null;

    if (!id) {
      this.produto = {};
      this.loading = false;
      return;
    }

    this.apiService.getProdutoById(Number(id)).subscribe(
      (produto) => {
        this.produto = produto;
        this.loading = false;
        this.scrollToTop();
      },
      (error) => {
        console.error('Erro ao carregar produto:', error);
        this.error = 'Erro ao carregar produto. Por favor, tente novamente mais tarde.';
        this.loading = false;
        this.scrollToTop();
      }
    );
  }

  onSubmit() {
    this.error = null;
    this.successMessage = null;

    if (!this.produto.nome || !this.produto.preco || !this.produto.categoria || !this.produto.descricao
      || !this.produto.imagem_url || !this.produto.estoque || !this.produto.status
    ) {
      this.error = 'Por favor, preencha todos os campos.';
      this.scrollToTop();
      return;
    }

    const isUpdate = !!this.produto.id;
    if (isUpdate) {
      this.apiService.updateProduto(this.produto.id, this.produto).subscribe({
        next: () => {
          this.successMessage = '✅ Produto atualizado com sucesso!';
          this.scrollToTop();
        },
        error: (err) => {
          console.error('Erro ao atualizar produto:', err);
          this.error = 'Erro ao atualizar produto. Por favor, tente novamente mais tarde.';
          this.scrollToTop();
        }
      });
    } else {
      this.apiService.createProduto(this.produto).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          console.error('Erro ao criar produto:', err);
          this.error = 'Erro ao criar produto. Por favor, tente novamente mais tarde.';
          this.scrollToTop();
        }
      });
    }
  }

  deleteProduto(id: number | undefined): void {
    if (!id || !confirm('Tem certeza que deseja excluir este produto?')) return;

    this.apiService.deleteProduto(id).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error('Erro:', err);
        this.error = 'Erro ao excluir produto. Por favor, tente novamente mais tarde.';
        this.scrollToTop();
      }
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
