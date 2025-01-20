const botao = document.querySelector(".botao_adicionar");
const input = document.querySelector(".digitar");
const listaCompleta = document.querySelector(".lista_tarefas");
const modal = document.getElementById("modal");
const botaoFecharModal = document.getElementById("fecharModal");
let minhaLista = [];

function adicionarNovaTarefa() {
  if (input.value.trim() === "") {
    mostrarModal(); // Mostra o modal se o campo estiver vazio
    return; // Interrompe a execução da função
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
    
        <img  src="./img/checked.png" alt="check-tarefa" onclick="concluirTarefa(${posicao})"/>
        <p>${item.tarefa}</p>
        <img  src="./img/trash.png" alt="Lixeira" onclick="deletar(${posicao})" />
    </li>`;
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem("lista", JSON.stringify(minhaLista));
}

function mostrarModal() {
  modal.style.display = "flex"; // Exibe o modal
}

botaoFecharModal.addEventListener("click", function () {
  modal.style.display = "none"; // Fecha o modal
});

recarregarTarefas();
botao.addEventListener("click", adicionarNovaTarefa);
