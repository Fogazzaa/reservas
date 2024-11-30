//adicionar um ouvinte de evento
document.addEventListener("DOMContentLoaded", getAllSalasTabela);
document.addEventListener("DOMContentLoaded", getAllSalasTabelaFiltroData);
document.addEventListener("DOMContentLoaded", getAllSalasTabelaFiltroNome);

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
      salaLista.innerHTML = ""; // Limpa a lista antes de adicionar novos itens
    
      // Verifica se há salas retornadas e as adiciona à tabela
      data.salas.forEach((sala) => {
        // Cria uma nova linha da tabela
        const tr = document.createElement("tr");
    
        // Cria a célula para o nome da sala
        const tdNome = document.createElement("td");
        tdNome.textContent = sala.nome; // Atribui o nome
        tr.appendChild(tdNome); // Adiciona a célula à linha
    
        // Cria a célula para a descrição da sala
        const tdDescricao = document.createElement("td");
        tdDescricao.textContent = sala.descricao; // Atribui a descrição da sala
        tr.appendChild(tdDescricao); // Adiciona a célula à linha
    
        // Cria a célula para o tipo de sala
        const tdTipo = document.createElement("td");
        tdTipo.textContent = sala.tipo; // Atribui o tipo da sala
        tr.appendChild(tdTipo); // Adiciona a célula à linha
    
        // Cria a célula para o bloco onde a sala está localizada
        const tdBloco = document.createElement("td");
        tdBloco.textContent = sala.bloco; // Atribui o bloco da sala
        tr.appendChild(tdBloco); // Adiciona a célula à linha
    
        // Cria a célula para a capacidade da sala
        const tdCapacidade = document.createElement("td");
        tdCapacidade.textContent = sala.capacidade; // Atribui a capacidade da sala
        tr.appendChild(tdCapacidade); // Adiciona a célula à linha
    
        // Adiciona um evento de clique na linha da sala para redirecionar para 'sala.html'
        tr.addEventListener("click", () => {
          window.location.href = './sala.html'; // Redireciona para a página de detalhes da sala
        });
    
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

function getAllSalasTabelaFiltroData() {
  // Realiza uma requisição GET para a URL
  const data = document.getElementById("filtro-data").value;

  console.log(`Filtrar por data: ${data}, Nome da sala: ${nome}`);
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
      salaLista.innerHTML = ""; // Limpa a lista antes de adicionar novos itens
    
      // Verifica se há salas retornadas e as adiciona à tabela
      data.salas.forEach((sala) => {
        // Cria uma nova linha da tabela
        const tr = document.createElement("tr");
    
        // Cria a célula para o nome da sala
        const tdNome = document.createElement("td");
        tdNome.textContent = sala.nome; // Atribui o nome
        tr.appendChild(tdNome); // Adiciona a célula à linha
    
        // Cria a célula para a descrição da sala
        const tdDescricao = document.createElement("td");
        tdDescricao.textContent = sala.descricao; // Atribui a descrição da sala
        tr.appendChild(tdDescricao); // Adiciona a célula à linha
    
        // Cria a célula para o tipo de sala
        const tdTipo = document.createElement("td");
        tdTipo.textContent = sala.tipo; // Atribui o tipo da sala
        tr.appendChild(tdTipo); // Adiciona a célula à linha
    
        // Cria a célula para o bloco onde a sala está localizada
        const tdBloco = document.createElement("td");
        tdBloco.textContent = sala.bloco; // Atribui o bloco da sala
        tr.appendChild(tdBloco); // Adiciona a célula à linha
    
        // Cria a célula para a capacidade da sala
        const tdCapacidade = document.createElement("td");
        tdCapacidade.textContent = sala.capacidade; // Atribui a capacidade da sala
        tr.appendChild(tdCapacidade); // Adiciona a célula à linha
    
        // Adiciona um evento de clique na linha da sala para redirecionar para 'sala.html'
        tr.addEventListener("click", () => {
          window.location.href = './sala.html'; // Redireciona para a página de detalhes da sala
        });
    
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

function getAllSalasTabelaFiltroNome() {
  // Realiza uma requisição GET para a URL
  const nome = document.getElementById("filtro-nome").value;

  console.log(`Filtrar por data: ${data}, Nome da sala: ${nome}`);
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
      salaLista.innerHTML = ""; // Limpa a lista antes de adicionar novos itens
    
      // Verifica se há salas retornadas e as adiciona à tabela
      data.salas.forEach((sala) => {
        // Cria uma nova linha da tabela
        const tr = document.createElement("tr");
    
        // Cria a célula para o nome da sala
        const tdNome = document.createElement("td");
        tdNome.textContent = sala.nome; // Atribui o nome
        tr.appendChild(tdNome); // Adiciona a célula à linha
    
        // Cria a célula para a descrição da sala
        const tdDescricao = document.createElement("td");
        tdDescricao.textContent = sala.descricao; // Atribui a descrição da sala
        tr.appendChild(tdDescricao); // Adiciona a célula à linha
    
        // Cria a célula para o tipo de sala
        const tdTipo = document.createElement("td");
        tdTipo.textContent = sala.tipo; // Atribui o tipo da sala
        tr.appendChild(tdTipo); // Adiciona a célula à linha
    
        // Cria a célula para o bloco onde a sala está localizada
        const tdBloco = document.createElement("td");
        tdBloco.textContent = sala.bloco; // Atribui o bloco da sala
        tr.appendChild(tdBloco); // Adiciona a célula à linha
    
        // Cria a célula para a capacidade da sala
        const tdCapacidade = document.createElement("td");
        tdCapacidade.textContent = sala.capacidade; // Atribui a capacidade da sala
        tr.appendChild(tdCapacidade); // Adiciona a célula à linha
    
        // Adiciona um evento de clique na linha da sala para redirecionar para 'sala.html'
        tr.addEventListener("click", () => {
          window.location.href = './sala.html'; // Redireciona para a página de detalhes da sala
        });
    
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