## Projeto Todo List - Flow

## Flow API | Back-end

Este é o repositório do back-end da aplicação **Flow**, desenvolvido como solução para a 2ª Fase do Processo Seletivo. A API foi construída utilizando o framework **NestJS**, seguindo uma abordagem de **Arquitetura Modular** para garantir escalabilidade, alta coesão e baixo acoplamento. Toda a infraestrutura está completamente conteinerizada utilizando **Docker**.

---

## Tecnologias e Ferramentas

- **Framework:** [NestJS]
- **Linguagem:** [TypeScript]
- **Banco de Dados:** [PostgreSQL]
- **ORM:** [TypeORM]
- **Conteinerização:** [Docker]
- **Segurança:** Criptografia de senhas com `bcrypt`

---

## Arquitetura do Projeto

O projeto adota uma **Arquitetura Modular**, onde a aplicação é dividida por domínios de negócio independentes. Cada módulo é autossuficiente e encapsula suas próprias responsabilidades (Controladores, Serviços, Entidades e DTOs):

**Boas Práticas e Padrões Aplicados:**

- **Repository Pattern:** Isolamento da camada de persistência de dados através do TypeORM.
- **Data Transfer Objects (DTOs):** Validação estrita de dados de entrada (`ValidationPipe`) com `class-validator`.
- **Dependency Injection:** Gerenciamento nativo de instâncias e inversão de controle pelo NestJS.

## Pré-requisitos

Para rodar o projeto, você precisa apenas do Docker Desktop na sua máquina, caso não o tenha siga os passos do caso 2

1 Clonar o Repositório:

    ```bash
       git clone [https://github.com/Mateus-Nasc/todo-list-ceos.git](https://github.com/Mateus-Nasc/todo-list-ceos.git)
    ```

2 Configurar as Variáveis de Ambiente:

Na pasta raiz do backend, crie um arquivo .env baseado no modelo de exemplo .env.exemplo:

Abra o arquivo .env e preencha as credenciais do banco de dados e sua chave JWT correspondentes. Exemplo:

    ```bash
       DB_TYPE=postgres
       DB_HOST=localhost
       DB_PORT=5432
       DB_USERNAME=postgres
       DB_PASSWORD=suaSenha
       DB_DATABASE=nomeDoBanco

       JWT_SECRET=crie-sua-própria-chave-secreta
       JWT_TOKEN_AUDIENCE=http://localhost:3000
       JWT_TOKEN_ISSUER=http://localhost:3000
       JWT_EXPIRES_IN=3600
    ```

3 Subir a Aplicação com Docker:

Navegue até a raiz do projeto onde o arquivo docker-compose.yml está localizado e execute:

    ```bash
       docker compose up -d --build
    ```

A API estará disponivel em: http://localhost:3000

### Caso 2

### Pré-requisitos caso não tenha docker e queira rodar a aplicação localmente

- [Node.js](https://nodejs.org/) instalado.
- [PostgreSQL](https://www.postgresql.org/) rodando localmente.
- Configurar as credenciais do banco de dados. Para isso siga como exemplo o modelo .env.exemplo

1. Clone o repositório:

   ```bash
      git clone [https://github.com/Mateus-Nasc/todo-list-ceos.git](https://github.com/Mateus-Nasc/todo-list-ceos.git)

   ```

2. entre na pasta e Instale as dependencias:

   ```bash
      cd backend
   ```

   ```bash
      npm install
   ```

3 Configurar as Variáveis de Ambiente:

Na pasta raiz do backend, crie um arquivo .env baseado no modelo de exemplo .env.exemplo:

Abra o arquivo .env e preencha as credenciais do banco de dados e sua chave JWT correspondentes. Exemplo:

```bash
   DB_TYPE=postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=suaSenha
   DB_DATABASE=nomeDoBanco

   JWT_SECRET=crie-sua-própria-chave-secreta
   JWT_TOKEN_AUDIENCE=http://localhost:3000
   JWT_TOKEN_ISSUER=http://localhost:3000
   JWT_EXPIRES_IN=3600

```

### Passo Final Executando o Projeto

Para iniciar o servidor:

`npm run start:dev`

A API estara disponivel em http://localhost:3000.
