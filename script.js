const botao = document.querySelector(".botao_adicionar");
const input = document.querySelector(".digitar");
const listaCompleta = document.querySelector(".lista_tarefas");
let minhaLista = [];

function adicionarNovaTarefa() {
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

recarregarTarefas();
botao.addEventListener("click", adicionarNovaTarefa);
