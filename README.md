## Desafio em Equipe - Ceos Jr (2026.1)

Este repositório contém a solução desenvolvida para a 2ª Fase do Processo Seletivo da **Ceos Jr**. O projeto consiste em uma aplicação Full-stack TODO List, contemplando sistema de autenticação, operações de CRUD e busca por filtros.

---

## Equipe Desenvolvedora

* **Membro 1:** Mateus Nasc - Backend
* **Membro 2:** Nome do Membro - 
* **Membro 3:** Nome do Membro
* **Membro 4:** Nome do Membro


---

## Estrutura do Repositório e Documentação Técnica

Para manter a organização e facilitar a avaliação, o projeto foi dividido em dois repositórios/pastas principais. **Cada diretório possui o seu próprio arquivo `README.md` detalhando as tecnologias, a arquitetura e os passos para execução individual:**

* [**Frontend**](./frontend-app) - Aplicação construida com Javascript, Html e Css
* [**Backend**](./backend) - API REST desenvolvida com NestJS, TypeScript e PostgreSQL.

---

## Executando o Projeto Completo (Docker Compose)

A forma mais rápida e recomendada de rodar a aplicação inteira (Frontend, Backend e Banco de Dados) é através do Docker. 

**1. Pré-requisitos:**
* Docker e Docker Compose instalados na máquina.

**2. Configuração de Variáveis:**
Antes de subir os contêineres, certifique-se de criar e preencher os arquivos `.env` nas respectivas pastas (`frontend` e `backend`). Consulte o README de cada pasta para ver o modelo de configuração.

**3. Iniciando a Aplicação:**
Na **raiz deste repositório** (onde este arquivo e o `docker-compose.yml` se encontram), execute o comando:

```bash
docker compose up -d --build
```
**4. Acessando as Aplicações:**

Frontend (Interface): http://localhost

Backend (API): http://localhost:3000

Banco de Dados (PostgreSQL): Porta 5432

Para instruções detalhadas sobre como rodar o projeto localmente (sem Docker), acesse as documentações específicas dentro das pastas /frontend e /backend.
