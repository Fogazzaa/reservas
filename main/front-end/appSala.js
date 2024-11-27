document.addEventListener("DOMContentLoaded", getAllSalasTabela);

function getAllSalasTabela() {
  fetch("http://localhost:5000/reservas/v1/sala", {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const salaLista = document.getElementById("sala-list-tabela");
      // Limpa a lista antes de Adicionar novos itens
      salaLista.innerHTML = "";
      // Verifica se há usuario retornados e os adiciona a tabela
      data.salas.forEach((sala) => {
        // Cria uma nova linha
        const tr = document.createElement("tr");

        const tdNome = document.createElement("td");
        tdNome.textContent = sala.nome;
        tr.appendChild(tdNome);

        const tdDescricao = document.createElement("td");
        tdDescricao.textContent = sala.descricao;
        tr.appendChild(tdDescricao);

        const tdTipo = document.createElement("td");
        tdTipo.textContent = sala.tipo;
        tr.appendChild(tdTipo);

        const tdBloco = document.createElement("td");
        tdBloco.textContent = sala.bloco;
        tr.appendChild(tdBloco);

        const tdCapacidade = document.createElement("td");
        tdCapacidade.textContent = sala.capacidade;
        tr.appendChild(tdCapacidade);

        salaLista.appendChild(tr);
      });
    })
    .catch((error) => {
      alert("Erro ao obter salas: " + error.message);
      console.error("Erro: ", error.message);
    });
}
