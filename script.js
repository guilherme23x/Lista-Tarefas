const botao = document.querySelector(".botao_adicionar");
const input = document.querySelector(".digitar");
const listaCompleta = document.querySelector(".lista_tarefas");
const modal = document.getElementById("modal");
const modalEditar = document.getElementById("modal-editar");
const botaoFecharModal = document.getElementById("fecharModal");

const botaoFecharModalEditar = document.getElementById("fecharModalEditar");
const botaoSalvarEditar = document.getElementById("salvar-editar");
const inputEditar = document.getElementById("input-editar");
let minhaLista = [];
let tarefaEditandoPosicao = null;

function adicionarNovaTarefa() {
  if (input.value.trim() === "") {
    mostrarModal();
    return;
  }

  minhaLista.push({
    tarefa: input.value,
    concluida: false,
  });
  input.value = "";
  mostrarTarefas();
}

function deletar(posicao) {
  minhaLista.splice(posicao, 1);
  mostrarTarefas();
}

function concluirTarefa(posicao) {
  minhaLista[posicao].concluida = !minhaLista[posicao].concluida;
  mostrarTarefas();
}

function recarregarTarefas() {
  const tarefasLocalStorage = localStorage.getItem("lista");
  if (tarefasLocalStorage) {
    minhaLista = JSON.parse(tarefasLocalStorage);
  }
  mostrarTarefas();
}

function mostrarTarefas() {
  let novaLi = "";

  minhaLista.forEach((item, posicao) => {
    novaLi =
      novaLi +
      `
    <li class="tarefa ${item.concluida && "done"}">
    <p class="tarefaCaixa">${item.tarefa}</p>

    <div class="botoesAcoes">
        <img  src="./img/checked.png" alt="check-tarefa" onclick="concluirTarefa(${posicao})"/>
        <img  src="./img/edit.png" alt="Editar" onclick="editarTarefa(${posicao})"/>
        <img  src="./img/trash.png" alt="Lixeira" onclick="deletar(${posicao})" />
        </div>
    </li>`;
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem("lista", JSON.stringify(minhaLista));
}

function mostrarModal() {
  modal.style.display = "flex";
}

function mostrarModalEditar() {
  modalEditar.style.display = "flex";
  inputEditar.value = minhaLista[tarefaEditandoPosicao].tarefa;
}

function fecharModalEditar() {
  modalEditar.style.display = "none";
  tarefaEditandoPosicao = null;
}

function editarTarefa(posicao) {
  tarefaEditandoPosicao = posicao;
  mostrarModalEditar();
}

botaoSalvarEditar.addEventListener("click", function () {
  const novaTarefa = inputEditar.value.trim();

  if (novaTarefa === "") {
    alert("A tarefa não pode ser vazia!");
    return;
  }

  minhaLista[tarefaEditandoPosicao].tarefa = novaTarefa;
  mostrarTarefas();
  fecharModalEditar();
});

botaoFecharModal.addEventListener("click", function () {
  modal.style.display = "none";
});

botaoFecharModalEditar.addEventListener("click", function () {
  fecharModalEditar();
});

recarregarTarefas();
botao.addEventListener("click", adicionarNovaTarefa);
