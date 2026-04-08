Zetta core
Aplicação CRUD de produtos de informática desenvolvida com angular 19 e json server.

Pré requisitos:
- Node.js instaldo
- npm 

Instalação: 
git clone https://github.com/i-antonio/zetta-core.git

Como executar: npm run dev

Estrutura do banco de dados (arquivo db.json):

{
  "produtos": [
    {
      "id": 1,
      "nome": "Teclado Mecânico",
      "descricao": "Teclado mecânico com switches azuis",
      "categoria": "Periféricos",
      "preco": 299.90,
      "imagem_url": "https://exemplo.com/teclado.jpg",
      "marca": "Redragon",
      "desconto": 0,
      "estoque": 15,
      "status": "ativo",
      "acessorios": []
    }
  ]
}

Funcionalidades CRUD:
- Create: Cadastros de novos produtos via formulário.
- Read: Listagem de todos os produtos cadastrados.
- Update: Edição de dados de um produto existente.
- Delete: Exclusão de um produto.

Endpoints da API: 
- GET: /api/produtos    (Lista todos os produtos)
- POST: /api/produtos   (Cria um novo produto)
- PUT: /api/produtos/:id    (Atualiza um produto)
- DELETE: /api/produtos/:id (Deleta um produto)

Problemas:
- Erro: porta 3000 está em uso:
Usar no terminal: 
npx kill-port 3000
npm run dev

Estrutura do projeto: 

zetta-core/
-src
    app/
        components/
            produtos/       #Listagem de produtos
            product-form/   #Formulário de criação/edição de produtos
            services/
                api.service.ts/     #Comunicação com a API
            models/
                models.ts/      #Interface do Produto
-db.json     #Banco de dados simulado
-proxy.conf.json     #Configuação do proxy Angula -> Json
