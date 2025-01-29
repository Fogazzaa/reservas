//adicionar um ouvinte de evento
document.addEventListener("DOMContentLoaded", getAllSalasTabela);

// Função que busca as informações das salas e preenche a tabela.
function getAllSalasTabela() {
  fetch("http://localhost:5000/reservas/v1/sala", {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Converte a resposta para JSON
      }
      return response.json().then((err) => {
        throw new Error(err.error); // Lança um erro caso a resposta não seja bem-sucedida
      });
    })
    .then((data) => {
      const salaLista = document.getElementById("sala-list-tabela");
      salaLista.innerHTML = ""; // Limpa a tabela antes de adicionar novos itens

      data.salas.forEach((sala) => {
        const tr = document.createElement("tr");

        // Cria e preenche a célula para o nome da sala
        const tdNome = document.createElement("td");
        tdNome.textContent = sala.nome;
        tr.appendChild(tdNome);

        // Cria e preenche a célula para a descrição da sala
        const tdDescricao = document.createElement("td");
        tdDescricao.textContent = sala.descricao;
        tr.appendChild(tdDescricao);

        // Cria e preenche a célula para o tipo da sala
        const tdTipo = document.createElement("td");
        tdTipo.textContent = sala.tipo;
        tr.appendChild(tdTipo);

        // Cria e preenche a célula para o bloco
        const tdBloco = document.createElement("td");
        tdBloco.textContent = sala.bloco;
        tr.appendChild(tdBloco);

        // Cria e preenche a célula para a capacidade
        const tdCapacidade = document.createElement("td");
        tdCapacidade.textContent = sala.capacidade;
        tr.appendChild(tdCapacidade);

        // Adiciona evento de clique para redirecionar para a página de detalhes
        tr.addEventListener("click", () => {
          window.location.href = "./sala.html";
        });

        salaLista.appendChild(tr); // Adiciona a linha à tabela
      });
    })
    .catch((error) => {
      alert("Erro ao obter salas: " + error.message); // Exibe o erro para o usuário
      console.error("Erro:", error.message); // Registra o erro no console
    });
}
