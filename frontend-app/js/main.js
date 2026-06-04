// ─────────────────────────────────────────────────────────
// CONFIGURAÇÃO
// Só o token fica salvo localmente — todo o resto vem do banco 

const API = 'http://localhost:3000';

function getToken() {
  return localStorage.getItem('token');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  };
}

// Decodifica o JWT pra pegar o ID
function decodeJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

 
// CARREGAR USUÁRIO + TAREFAS (uma única chamada ao banco)
// GET /usuarios/:id já retorna { id, nome, email, tarefas[] } 

async function carregarDados() {
  const payload = decodeJwt(getToken());
  if (!payload) return logout();

  try {
    const res = await fetch(`${API}/usuarios/${payload.sub}`, {
      headers: authHeaders()
    });

    if (res.status === 401) return logout();
    if (!res.ok) throw new Error('Erro ao carregar dados');

    const usuario = await res.json();

    // Mostra o nome vindo do banco
    document.getElementById('nome-usuario').textContent = usuario.nome;

    // Renderiza as tarefas vindas do banco
    renderizarTarefas(usuario.tarefas || []);

  } catch (err) {
    console.error('Erro ao carregar dados:', err);
  }
}

 
// CRIAR TAREFA 

async function criarTarefa() {
  const payload = decodeJwt(getToken());

  try {
    const res = await fetch(`${API}/tarefas`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        titulo: 'Nova Tarefa',
        descricao: 'Clique para editar',
        usuarioId: payload.sub
      })
    });

    if (!res.ok) throw new Error('Erro ao criar tarefa');

    const novaTarefa = await res.json();
    adicionarCardNaTela(novaTarefa);
  } catch (err) {
    console.error('Erro ao criar tarefa:', err);
  }
}

 
// ATUALIZAR TAREFA 

async function atualizarTarefa(id, dados) {
  try {
    const res = await fetch(`${API}/tarefas/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(dados)
    });

    if (!res.ok) throw new Error('Erro ao atualizar tarefa');
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
  }
}

 
// DELETAR TAREFA 

async function deletarTarefa(id, card) {
  try {
    const res = await fetch(`${API}/tarefas/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });

    if (!res.ok) throw new Error('Erro ao deletar tarefa');

    card.remove();
  } catch (err) {
    console.error('Erro ao deletar tarefa:', err);
  }
}

 
// COMPLETAR / DESCOMPLETAR TAREFA 

async function toggleCompletar(id, card, btn) {
  const jaCompletada = card.classList.contains('completada');
  await atualizarTarefa(id, { completada: !jaCompletada });
  card.classList.toggle('completada');
  btn.textContent = jaCompletada ? '✓' : '↩';
}

 
// RENDERIZAR LISTA DE TAREFAS 

function renderizarTarefas(tarefas) {
  document.querySelectorAll('.task-list').forEach(c => c.remove());
  tarefas.forEach(tarefa => adicionarCardNaTela(tarefa));
}

 
// CRIAR CARD NA TELA 

function adicionarCardNaTela(tarefa) {
  const board = document.getElementById('board');
  const btn   = document.getElementById('btn-add');

  const data = tarefa.criadoEm
    ? new Date(tarefa.criadoEm).toLocaleDateString('pt-BR')
    : '--/--/----';

  const card = document.createElement('div');
  card.className = 'task-list' + (tarefa.completada ? ' completada' : '');
  card.dataset.id = tarefa.id;

  card.innerHTML = `
    <div class="task-list-header">
      <input class="task-list-title" value="${tarefa.titulo}" placeholder="Título">
      <button class="Task-complete">${tarefa.completada ? '↩' : '✓'}</button>
      <button class="Task-delete">X</button>
    </div>
    <span class="Task-date">criado em: ${data}</span>
    <input class="Task-description" value="${tarefa.descricao || ''}" placeholder="- Descrição">
  `;

  // Salva título ao sair do campo
  card.querySelector('.task-list-title').addEventListener('blur', (e) => {
    atualizarTarefa(tarefa.id, { titulo: e.target.value });
  });

  // Salva descrição ao sair do campo
  card.querySelector('.Task-description').addEventListener('blur', (e) => {
    atualizarTarefa(tarefa.id, { descricao: e.target.value });
  });

  // Completar / desfazer
  card.querySelector('.Task-complete').addEventListener('click', (e) => {
    toggleCompletar(tarefa.id, card, e.target);
  });

  // Deletar
  card.querySelector('.Task-delete').addEventListener('click', () => {
    deletarTarefa(tarefa.id, card);
  });

  board.insertBefore(card, btn);
}

 
// BUSCA — filtra cards pelo título


document.getElementById('input-busca').addEventListener('input', (e) => {
  const termo = e.target.value.toLowerCase();
  document.querySelectorAll('.task-list').forEach(card => {
    const titulo = card.querySelector('.task-list-title')?.value.toLowerCase() || '';
    card.style.display = titulo.includes(termo) ? '' : 'none';
  });
});


// LOGOUT — apaga só o token, assim levando a pessoa de volta pra página de login


function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

document.getElementById('btn-logout').addEventListener('click', logout);
document.getElementById('btn-add').addEventListener('click', criarTarefa);


// INICIALIZAÇÃO


if (!getToken()) {
  window.location.href = 'index.html'; // puxa o token da pagina de login
} else {
  carregarDados(); // coloca todas as tarefas no front
}
