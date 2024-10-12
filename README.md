Índice
Introdução
Arquitetura do Sistema
Tecnologias Utilizadas
Configuração do Ambiente
Banco de Dados
APIs
Autenticação e Segurança
Deploy e Configuração de Produção
Testes
Monitoramento e Logs
Manutenção e Atualizações
1. Introdução
O projeto "Venda de Brinquedos de Madeira" é um sistema de e-commerce desenvolvido para a venda de brinquedos artesanais. O objetivo é criar uma plataforma onde os clientes possam visualizar, adicionar ao carrinho e comprar brinquedos, enquanto os administradores possam gerenciar inventário, pedidos e clientes.

Público-Alvo:
Clientes: Consumidores finais interessados em comprar brinquedos de madeira.
Administradores: Usuários que gerenciam o catálogo de produtos e pedidos.
Funcionalidades principais:
Exibição de catálogo de brinquedos.
Carrinho de compras e checkout.
Integração com sistemas de pagamento.
Autenticação e gerenciamento de perfis de usuário.
Gerenciamento de pedidos e inventário para administradores.
2. Arquitetura do Sistema
O sistema é baseado em uma arquitetura web moderna de três camadas:

Frontend: Interface do usuário, desenvolvida em React.
Backend: API RESTful desenvolvida em Node.js com Express.
Banco de Dados: Sistema de banco de dados relacional MySQL.
Diagrama de Arquitetura:
plaintext
Copiar código
   [Frontend (React)]  <->  [Backend (Node.js, Express)]  <->  [Banco de Dados (MySQL)]
3. Tecnologias Utilizadas
Frontend:
React: Para o desenvolvimento da interface do usuário.
CSS (Sass): Para estilização dos componentes.
Axios: Para fazer requisições HTTP ao backend.
Backend:
Node.js: Ambiente de execução JavaScript.
Express: Framework para criar a API REST.
JWT (JSON Web Token): Para autenticação de usuários.
Banco de Dados:
MySQL: Sistema de gerenciamento de banco de dados relacional.
Ferramentas e Bibliotecas Adicionais:
Stripe API: Para integração com pagamentos.
Docker: Para containerização de ambientes.
NGINX: Servidor web usado no ambiente de produção.
4. Configuração do Ambiente
Requisitos de Software:
Node.js v16.x ou superior.
MySQL 8.x.
Docker (opcional, para ambiente de desenvolvimento).
Git para controle de versão.
Passos para Configuração Local:
Clone o repositório:

bash
Copiar código
git clone https://github.com/seuprojeto/venda-de-brinquedos.git
Instale as dependências do frontend e backend:

bash
Copiar código
cd frontend
npm install
cd ../backend
npm install
Configure as variáveis de ambiente no arquivo .env no backend:

plaintext
Copiar código
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=brinquedos_db
JWT_SECRET=seu_token_secreto
STRIPE_SECRET_KEY=sua_chave_secreta_stripe
Execute o backend e o frontend:

bash
Copiar código
cd backend
npm start
cd ../frontend
npm start
5. Banco de Dados
O banco de dados MySQL é utilizado para armazenar informações dos produtos, usuários, pedidos e inventário.

Esquema do Banco de Dados:
Tabela users: Armazena informações dos usuários (clientes e administradores).

id, nome, email, senha, tipo_usuario.
Tabela produtos: Armazena os brinquedos disponíveis para venda.

id, nome, preço, descrição, quantidade_estoque, imagem_url.
Tabela pedidos: Armazena os pedidos realizados pelos clientes.

id, user_id, total, status, data_criacao.
Relacionamentos:
Um usuário pode fazer vários pedidos.
Cada pedido pode ter vários produtos associados (relacionamento muitos para muitos).
6. APIs
A API RESTful expõe os seguintes endpoints:

Usuários:
POST /api/auth/login: Autenticação de usuários.
POST /api/auth/register: Registro de novos usuários.
Produtos:
GET /api/produtos: Lista todos os produtos disponíveis.
POST /api/produtos: Adiciona um novo produto (apenas para administradores).
Pedidos:
POST /api/pedidos: Cria um novo pedido.
GET /api/pedidos/:id: Retorna os detalhes de um pedido.
7. Autenticação e Segurança
JWT (JSON Web Tokens): Utilizado para autenticação baseada em tokens. Os tokens são gerados no login e enviados no cabeçalho das requisições subsequentes.
Criptografia de Senhas: Todas as senhas de usuários são armazenadas com criptografia bcrypt.
HTTPS: Todas as requisições em produção são feitas por meio de HTTPS, utilizando certificados SSL.
8. Deploy e Configuração de Produção
Servidor:
O ambiente de produção utiliza um servidor Linux com Docker para executar o backend e o frontend.
NGINX é utilizado como proxy reverso e servidor de arquivos estáticos.
Passos de Deploy:
Construa o frontend:
bash
Copiar código
cd frontend
npm run build
Faça o deploy com Docker:
bash
Copiar código
docker-compose up --build
9. Testes
Testes Unitários:
O backend possui testes unitários implementados usando Jest.
O frontend utiliza Jest e React Testing Library para testes de componentes.
Como Executar os Testes:
Backend:
bash
Copiar código
cd backend
npm test
Frontend:
bash
Copiar código
cd frontend
npm test
10. Monitoramento e Logs
Logs: Logs de erro e acessos são armazenados utilizando Winston no backend.
Monitoramento: O sistema de produção é monitorado com ferramentas como Prometheus e Grafana para acompanhar a saúde do sistema.
11. Manutenção e Atualizações
Atualizações:
Sempre faça o pull das últimas alterações do repositório antes de começar qualquer tarefa de desenvolvimento.
Mantenha o código atualizado com as dependências usando o comando npm update.
