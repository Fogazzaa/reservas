//adicionar um ouvinte de evento
document.addEventListener("DOMContentLoaded", getAllSalasTabela);

// Função que busca as informações das salas e preenche a tabela.
function getAllSalasTabela() {
  // Realiza uma requisição GET para a URL
  fetch("http://localhost:5000/reservas/v1/sala", {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
    },
  })
    .then((response) => {
      // Trata a resposta da requisição
      if (response.ok) {
        // Se for bem-sucedida
        return response.json(); //converte a resposta para formato JSON
      }
      return response.json().then((err) => {
        // Caso contrário, lança um erro
        throw new Error(err.error);
      });
    })

    // Após obter os dados em JSON, preenche a tabela
    .then((data) => {
      const salaLista = document.getElementById("sala-list-tabela"); // Obtém o elemento da tabela onde os dados das salas estão
      salaLista.innerHTML = ""; // Limpa a lista antes de Adicionar novos itens
      // Verifica se há usuario retornados e os adiciona a tabela
      data.salas.forEach((sala) => {
        // Cria uma nova linha
        const tr = document.createElement("tr");

        // Cria e adiciona a célula para o nome da sala
        const tdNome = document.createElement("td");
        tdNome.textContent = sala.nome; // Atribui o nome
        tr.appendChild(tdNome); // Adiciona a célula à linha

        // Cria e adiciona a célula para a descrição da sala
        const tdDescricao = document.createElement("td");
        tdDescricao.textContent = sala.descricao; // Atribui a descrição da sala à célula
        tr.appendChild(tdDescricao); // Adiciona a célula à linha

        // Cria e adiciona a célula para o tipo de sala
        const tdTipo = document.createElement("td");
        tdTipo.textContent = sala.tipo; // Atribui o tipo da sala à célula
        tr.appendChild(tdTipo); // Adiciona a célula à linha

        // Cria e adiciona a célula para o bloco onde a sala está localizada
        const tdBloco = document.createElement("td");
        tdBloco.textContent = sala.bloco; // Atribui o bloco da sala à célula
        tr.appendChild(tdBloco); // Adiciona a célula à linha

        // Cria e adiciona a célula para a capacidade da sala
        const tdCapacidade = document.createElement("td");
        tdCapacidade.textContent = sala.capacidade; // Atribui a capacidade da sala à célula
        tr.appendChild(tdCapacidade); // Adiciona a célula à linha

        // Adiciona a linha completa à tabela
        salaLista.appendChild(tr);
      });
    })
    // Se ocorrer algum erro durante o processo, exibe um alerta e imprime o erro no console
    .catch((error) => {
      alert("Erro ao obter salas: " + error.message); // Exibe a mensagem de erro
      console.error("Erro: ", error.message); // Loga o erro no console
    });
}
