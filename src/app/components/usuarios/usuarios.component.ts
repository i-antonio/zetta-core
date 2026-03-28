import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../models/models';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;

  newUsuario: Usuario = {
    nome: '',
    email: '',
    telefone: '',
    profissao: ''
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar usuários. Certifique-se de que o JSON Server está rodando.';
        this.loading = false;
        console.error('Erro:', err);
      }
    });
  }

  onSubmit(): void {
    if (!this.newUsuario.nome || !this.newUsuario.email || 
        !this.newUsuario.telefone || !this.newUsuario.profissao) {
      return;
    }

    this.apiService.createUsuario(this.newUsuario).subscribe({
      next: () => {
        this.successMessage = '✅ Usuário adicionado com sucesso!';
        this.newUsuario = { nome: '', email: '', telefone: '', profissao: '' };
        this.loadUsuarios();
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (err) => {
        this.error = '❌ Erro ao adicionar usuário.';
        console.error('Erro:', err);
      }
    });
  }

  deleteUsuario(id: number | undefined): void {
    if (!id || !confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    this.apiService.deleteUsuario(id).subscribe({
      next: () => {
        this.loadUsuarios();
      },
      error: (err) => {
        alert('Erro ao excluir usuário.');
        console.error('Erro:', err);
      }
    });
  }
}
