# JSON Server Angular Project

Este é um projeto **Angular** que demonstra o uso do **JSON Server** para criar rapidamente uma API REST fake para desenvolvimento e testes.

## 🚀 Tecnologias Utilizadas

- **Angular 19**: Framework JavaScript para construção de aplicações web
- **TypeScript**: Linguagem de programação tipada baseada em JavaScript
- **RxJS**: Biblioteca para programação reativa
- **JSON Server**: Ferramenta que cria uma API REST completa a partir de um arquivo JSON
- **Node.js**: Plataforma de desenvolvimento JavaScript no lado servidor

## 📋 Pré-requisitos

- Node.js instalado (versão 18 ou superior)
- npm (gerenciador de pacotes do Node.js)

## 🚀 Instalação

1. Clone ou baixe este projeto
2. Instale as dependências:

```bash
npm install
```

## ▶️ Como usar

### Desenvolvimento (Angular + JSON Server)

Iniciar Angular e JSON Server simultaneamente:

```bash
npm run dev
```

Isso iniciará:
- **Angular**: `http://localhost:4200`
- **JSON Server**: `http://localhost:3000`

### Apenas Angular

```bash
npm start
```

### Apenas JSON Server

```bash
npm run server
```

### JSON Server em porta específica (3001)

```bash
npm run start:port
```

### JSON Server com acesso externo

```bash
npm run start:host
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── usuarios/         # Componente de usuários
│   │   ├── produtos/         # Componente de produtos
│   │   └── posts/            # Componente de posts
│   ├── services/
│   │   └── api.service.ts    # Serviço de comunicação com API
│   ├── models/
│   │   └── models.ts         # Interfaces TypeScript
│   └── app.component.ts      # Componente principal
├── styles.css                # Estilos globais
└── index.html                # HTML principal
```

## 📡 Endpoints disponíveis

Após iniciar o servidor, você terá acesso aos seguintes endpoints:

### Usuários

- `GET    http://localhost:3000/usuarios` - Lista todos os usuários
- `GET    http://localhost:3000/usuarios/1` - Busca usuário por ID
- `POST   http://localhost:3000/usuarios` - Cria novo usuário
- `PUT    http://localhost:3000/usuarios/1` - Atualiza usuário
- `PATCH  http://localhost:3000/usuarios/1` - Atualiza parcialmente
- `DELETE http://localhost:3000/usuarios/1` - Remove usuário

### Produtos

- `GET    http://localhost:3000/produtos` - Lista todos os produtos
- `GET    http://localhost:3000/produtos/1` - Busca produto por ID
- `POST   http://localhost:3000/produtos` - Cria novo produto
- `PUT    http://localhost:3000/produtos/1` - Atualiza produto
- `PATCH  http://localhost:3000/produtos/1` - Atualiza parcialmente
- `DELETE http://localhost:3000/produtos/1` - Remove produto

### Posts

- `GET    http://localhost:3000/posts` - Lista todos os posts
- `GET    http://localhost:3000/posts/1` - Busca post por ID
- `POST   http://localhost:3000/posts` - Cria novo post
- `PUT    http://localhost:3000/posts/1` - Atualiza post
- `PATCH  http://localhost:3000/posts/1` - Atualiza parcialmente
- `DELETE http://localhost:3000/posts/1` - Remove post

## 🔍 Filtros e consultas

JSON Server suporta vários tipos de consultas:

### Filtros

```http
GET /usuarios?nome=João
GET /produtos?categoria=Eletrônicos
GET /produtos?preco_gte=100&preco_lte=200
```

### Paginação

```http
GET /usuarios?_page=1&_limit=10
```

### Ordenação

```http
GET /usuarios?_sort=nome&_order=asc
GET /produtos?_sort=preco&_order=desc
```

### Busca full-text

```http
GET /usuarios?q=João
```

### Relacionamentos

```http
GET /posts?_embed=comments
GET /comments?_expand=post
```

## 📝 Operadores disponíveis

- `_gte` - maior ou igual (greater than or equal)
- `_lte` - menor ou igual (less than or equal)
- `_ne` - diferente (not equal)
- `_like` - busca com regex

## 🛠️ Modificando os dados

Para modificar os dados da API, edite o arquivo `db.json`. O JSON Server irá recarregar automaticamente as alterações.

## 📚 Documentação oficial

Para mais informações, consulte a [documentação oficial do JSON Server](https://github.com/typicode/json-server).

## 📄 Licença

ISC
