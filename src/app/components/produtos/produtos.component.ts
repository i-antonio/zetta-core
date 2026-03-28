import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Produto } from '../../models/models';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  loading = false;
  error: string | null = null;

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
}
