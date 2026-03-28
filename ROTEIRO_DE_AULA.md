# 📚 Roteiro de Aula - Projeto Angular com JSON Server

## 🎯 Objetivo da Aula
Ensinar o desenvolvimento de uma aplicação Angular moderna utilizando JSON Server para simular uma API REST, abordando conceitos de arquitetura, componentes standalone, serviços e operações CRUD.

---

## 📋 Pré-requisitos
- Node.js instalado (versão 18+)
- Visual Studio Code
- Conhecimento básico de TypeScript
- Conhecimento básico de HTML/CSS
- Terminal/Prompt de comando

---

## 📖 Conteúdo Programático

### **Módulo 1: Introdução ao Projeto (15 min)**

#### 1.1 Apresentação do Projeto
- **O que é o projeto?**
  - Aplicação de CRUD (Create, Read, Update, Delete) com Angular 19
  - Gerenciamento de Usuários, Produtos e Posts
  - API REST fake usando JSON Server

- **Tecnologias utilizadas:**
  - Angular 19 (versão mais recente)
  - JSON Server (simulador de API REST)
  - RxJS para programação reativa
  - HttpClient para requisições HTTP
  - TypeScript para tipagem estática

#### 1.2 Vantagens do JSON Server
- ✅ **Desenvolvimento rápido**: API REST funcional em minutos
- ✅ **Sem backend**: Ideal para prototipagem e aprendizado
- ✅ **Dados persistentes**: Salva dados no arquivo `db.json`
- ✅ **RESTful completo**: Suporta GET, POST, PUT, PATCH, DELETE

---

### **Módulo 2: Arquitetura do Projeto (20 min)**

#### 2.1 Estrutura de Pastas
```
json-server-project/
├── db.json                 # Banco de dados JSON
├── proxy.conf.json         # Configuração de proxy
├── package.json            # Dependências do projeto
├── angular.json            # Configuração do Angular
├── src/
│   ├── index.html         # HTML principal
│   ├── main.ts            # Bootstrap da aplicação
│   ├── styles.css         # Estilos globais
│   └── app/
│       ├── app.component.ts      # Componente raiz
│       ├── app.config.ts         # Configuração da aplicação
│       ├── models/
│       │   └── models.ts         # Interfaces TypeScript
│       ├── services/
│       │   └── api.service.ts    # Serviço de API
│       └── components/
│           ├── usuarios/         # CRUD de usuários
│           ├── produtos/         # Listagem de produtos
│           └── posts/            # Listagem de posts
```

#### 2.2 Fluxo de Dados
```
Componente → Service → HttpClient → JSON Server → db.json
    ↑                                      ↓
    └────────── Observable/RxJS ←─────────┘
```

---

### **Módulo 3: Configuração Inicial (15 min)**

#### 3.1 Instalação das Dependências
```bash
# Navegar até a pasta do projeto
cd json-server-project

# Instalar dependências
npm install
```

#### 3.2 Arquivo db.json
**Explicar a estrutura do banco de dados:**
```json
{
  "usuarios": [
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com",
      "telefone": "(11) 98765-4321",
      "profissao": "Desenvolvedor"
    }
  ],
  "produtos": [...],
  "posts": [...]
}
```

#### 3.3 Configuração do Proxy (proxy.conf.json)
**Explicar por que usar proxy:**
- Evita problemas de CORS
- Redireciona requisições `/api` para `http://localhost:3000`

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

#### 3.4 Scripts no package.json
```json
"scripts": {
  "start": "ng serve",                    // Inicia Angular
  "server": "json-server --watch db.json", // Inicia JSON Server
  "dev": "concurrently \"npm run server\" \"npm start\"" // Ambos
}
```

---

### **Módulo 4: Conceitos do Angular 19 (25 min)**

#### 4.1 Standalone Components
**O que mudou no Angular 19:**
- ❌ Não precisa mais de NgModule
- ✅ Componentes independentes e autocontidos
- ✅ Importações explícitas no próprio componente

**Exemplo prático:**
```typescript
@Component({
  selector: 'app-usuarios',
  standalone: true,           // ← Standalone!
  imports: [CommonModule, FormsModule], // ← Importações diretas
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent { }
```

#### 4.2 Bootstrap da Aplicação (main.ts)
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

#### 4.3 Configuração da Aplicação (app.config.ts)
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient()  // ← HttpClient disponível globalmente
  ]
};
```

---

### **Módulo 5: Models e Tipagem (10 min)**

#### 5.1 Interfaces TypeScript (models.ts)
**Explicar a importância da tipagem:**
```typescript
export interface Usuario {
  id?: number;        // ← Opcional (gerado pelo server)
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
```

**Vantagens:**
- ✅ Autocompletar no IDE
- ✅ Validação em tempo de desenvolvimento
- ✅ Documentação viva do código

---

### **Módulo 6: Service Layer (25 min)**

#### 6.1 ApiService - Camada de Comunicação
**Explicar o padrão Service:**
- Centraliza a lógica de comunicação com a API
- Reutilizável em múltiplos componentes
- Facilita manutenção e testes

```typescript
@Injectable({
  providedIn: 'root'  // ← Singleton (instância única)
})
export class ApiService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  // GET - Listar todos os usuários
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  // POST - Criar novo usuário
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario);
  }

  // DELETE - Excluir usuário
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }
}
```

#### 6.2 RxJS e Observables
**Conceitos importantes:**
- **Observable**: Stream assíncrono de dados
- **Subscribe**: Inscrição para receber dados
- **Operators**: Transformação de dados (map, filter, etc.)

---

### **Módulo 7: Componente de Usuários - CRUD Completo (30 min)**

#### 7.1 Estrutura do Componente
```typescript
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];        // Lista de usuários
  loading = false;                 // Estado de carregamento
  error: string | null = null;     // Mensagens de erro
  successMessage: string | null = null; // Mensagens de sucesso

  newUsuario: Usuario = {          // Formulário
    nome: '', email: '', telefone: '', profissao: ''
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadUsuarios();  // Carregar dados ao iniciar
  }
}
```

#### 7.2 Método loadUsuarios() - READ
```typescript
loadUsuarios(): void {
  this.loading = true;
  this.error = null;

  this.apiService.getUsuarios().subscribe({
    next: (data) => {
      this.usuarios = data;      // Sucesso
      this.loading = false;
    },
    error: (err) => {
      this.error = 'Erro ao carregar usuários';
      this.loading = false;
      console.error('Erro:', err);
    }
  });
}
```

#### 7.3 Método onSubmit() - CREATE
```typescript
onSubmit(): void {
  // Validação básica
  if (!this.newUsuario.nome || !this.newUsuario.email || 
      !this.newUsuario.telefone || !this.newUsuario.profissao) {
    return;
  }

  this.apiService.createUsuario(this.newUsuario).subscribe({
    next: () => {
      this.successMessage = '✅ Usuário adicionado com sucesso!';
      this.newUsuario = { nome: '', email: '', telefone: '', profissao: '' };
      this.loadUsuarios();  // Recarregar lista
      setTimeout(() => this.successMessage = null, 3000);
    },
    error: (err) => {
      this.error = '❌ Erro ao adicionar usuário.';
      console.error('Erro:', err);
    }
  });
}
```

#### 7.4 Método deleteUsuario() - DELETE
```typescript
deleteUsuario(id: number | undefined): void {
  if (!id || !confirm('Tem certeza que deseja excluir?')) {
    return;
  }

  this.apiService.deleteUsuario(id).subscribe({
    next: () => {
      this.loadUsuarios();  // Recarregar lista
    },
    error: (err) => {
      alert('Erro ao excluir usuário.');
      console.error('Erro:', err);
    }
  });
}
```

---

### **Módulo 8: Template e Data Binding (20 min)**

#### 8.1 Estrutura do Template HTML
```html
<div class="usuarios-container">
  <h2>👥 Gerenciamento de Usuários</h2>

  <!-- Formulário de Cadastro -->
  <form (ngSubmit)="onSubmit()">
    <input [(ngModel)]="newUsuario.nome" 
           name="nome" 
           placeholder="Nome" 
           required>
    <button type="submit">Adicionar</button>
  </form>

  <!-- Mensagens de Feedback -->
  <div *ngIf="successMessage" class="success">
    {{ successMessage }}
  </div>

  <!-- Loading State -->
  <div *ngIf="loading">Carregando...</div>

  <!-- Lista de Usuários -->
  <table *ngIf="!loading && usuarios.length > 0">
    <tr *ngFor="let usuario of usuarios">
      <td>{{ usuario.nome }}</td>
      <td>{{ usuario.email }}</td>
      <td>
        <button (click)="deleteUsuario(usuario.id)">🗑️</button>
      </td>
    </tr>
  </table>
</div>
```

#### 8.2 Tipos de Data Binding
- **Interpolation**: `{{ variavel }}`
- **Property Binding**: `[propriedade]="valor"`
- **Event Binding**: `(evento)="metodo()"`
- **Two-Way Binding**: `[(ngModel)]="variavel"`

#### 8.3 Diretivas Estruturais
- `*ngIf`: Renderização condicional
- `*ngFor`: Loop sobre arrays
- `*ngSwitch`: Switch case no template

---

### **Módulo 9: Executando o Projeto (15 min)**

#### 9.1 Iniciar JSON Server e Angular
```bash
# Opção 1: Executar ambos simultaneamente
npm run dev

# Opção 2: Executar separadamente
# Terminal 1
npm run server

# Terminal 2
npm start
```

#### 9.2 Acessar a Aplicação
- **Angular**: http://localhost:4200
- **JSON Server**: http://localhost:3000
- **API Endpoints**:
  - GET http://localhost:3000/usuarios
  - POST http://localhost:3000/usuarios
  - DELETE http://localhost:3000/usuarios/:id

#### 9.3 Testar a Aplicação
1. Abrir o navegador em http://localhost:4200
2. Adicionar um novo usuário
3. Verificar que o usuário aparece na lista
4. Deletar um usuário
5. Verificar o arquivo db.json (dados persistidos)

---

### **Módulo 10: Boas Práticas e Conceitos Avançados (20 min)**

#### 10.1 Separation of Concerns
- **Componentes**: Lógica de apresentação e interação
- **Services**: Lógica de negócio e comunicação
- **Models**: Estruturas de dados
- **Styles**: Apresentação visual

#### 10.2 Error Handling
```typescript
this.apiService.getUsuarios().subscribe({
  next: (data) => { /* sucesso */ },
  error: (err) => {
    console.error('Erro:', err);
    this.error = 'Mensagem amigável para o usuário';
  },
  complete: () => { /* opcional */ }
});
```

#### 10.3 Loading States
```typescript
// Sempre indicar ao usuário que algo está acontecendo
this.loading = true;
this.apiService.getData().subscribe({
  next: (data) => {
    this.data = data;
    this.loading = false;
  }
});
```

#### 10.4 Validação de Formulários
```typescript
// Validação simples
if (!this.form.valid) {
  return;
}

// Validação com Reactive Forms (avançado)
this.form = new FormGroup({
  nome: new FormControl('', [Validators.required, Validators.minLength(3)])
});
```

---

### **Módulo 11: Exercícios Práticos (30 min)**

#### Exercício 1: Adicionar campo "idade" no usuário
1. Atualizar interface em `models.ts`
2. Adicionar campo no formulário HTML
3. Atualizar `db.json`
4. Testar o CRUD

#### Exercício 2: Implementar UPDATE (Editar usuário)
1. Adicionar método `updateUsuario()` no service
2. Criar formulário de edição no componente
3. Implementar lógica de edição
4. Testar a funcionalidade

#### Exercício 3: Adicionar filtro de busca
1. Criar campo de input para busca
2. Implementar método de filtro
3. Usar pipe `filter` do RxJS (avançado)

#### Exercício 4: Implementar paginação
1. Adicionar parâmetros `_page` e `_limit` nas requisições
2. Criar botões de navegação
3. Controlar estado da página atual

---

### **Módulo 12: Debugging e Ferramentas (15 min)**

#### 12.1 DevTools do Navegador
- **Console**: Verificar erros e logs
- **Network**: Monitorar requisições HTTP
- **Elements**: Inspecionar DOM e estilos

#### 12.2 Angular DevTools (Extensão)
- Instalar extensão do Chrome/Firefox
- Visualizar componentes e estado
- Depurar change detection
- Profile de performance

#### 12.3 Comandos Úteis
```bash
# Verificar erros durante o desenvolvimento
ng serve --open

# Build de produção
ng build --configuration production

# Rodar testes
ng test

# Verificar versão do Angular
ng version
```

---

## 🎓 Conclusão da Aula

### Conceitos Aprendidos
- ✅ Arquitetura de aplicação Angular moderna
- ✅ Standalone Components (Angular 19)
- ✅ Services e Dependency Injection
- ✅ HttpClient e requisições HTTP
- ✅ RxJS e programação reativa
- ✅ Operações CRUD completas
- ✅ Data binding e diretivas
- ✅ JSON Server como mock de API

### Próximos Passos
1. Implementar autenticação/autorização
2. Adicionar roteamento (Angular Router)
3. Criar formulários reativos
4. Adicionar validações avançadas
5. Implementar lazy loading
6. Conectar com API real (Node.js, .NET, etc.)
7. Deploy da aplicação

---

## 📚 Recursos Adicionais

### Documentação Oficial
- [Angular Documentation](https://angular.dev)
- [JSON Server GitHub](https://github.com/typicode/json-server)
- [RxJS Documentation](https://rxjs.dev)

### Tutoriais Recomendados
- Angular Tutorial oficial (Tour of Heroes)
- RxJS Operators playground
- TypeScript Deep Dive

### Comunidades
- Angular Brasil (Discord/Telegram)
- Stack Overflow
- Dev.to - Tag Angular

---

## 🤝 Suporte

Para dúvidas e suporte:
- Email do professor
- Horário de atendimento
- Fórum da disciplina

---

**Última atualização**: Março de 2026
**Versão do Angular**: 19.1.0
**Instrutor**: [Seu Nome]
