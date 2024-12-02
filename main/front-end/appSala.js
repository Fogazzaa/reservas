//adicionar um ouvinte de evento
document.addEventListener("DOMContentLoaded", getAllSalasTabela);
document.addEventListener("DOMContentLoaded", getAllSalasTabelaFiltroData);
document.addEventListener("DOMContentLoaded", getAllSalasTabelaFiltroNome);

// Função que busca as informações das salas e preenche a tabela.
function getAllSalasTabela() {
  fetch("http://10.89.240.84:5000/reservas/v1/sala", {
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

function getAllSalasTabelaFiltroData() {
  // Realiza uma requisição GET para a URL
  // Obtém o valor do campo de entrada de data com o ID "filtro-data"
  // e armazena como uma string na variável data_inicio_string.
  const data_inicio_string = document.getElementById("filtro-data").value;

  // Cria um objeto Date a partir da string de data de início.
  // Isso converte a string em um formato que pode ser manipulado como uma data.
  const data_inicio = new Date(data_inicio_string);

  // Obtém novamente o valor do campo de entrada de data com o ID "filtro-data"
  // e armazena como uma string na variável data_fim_string.
  // (Nota: Isso pode ser desnecessário, já que estamos usando o mesmo campo de entrada.)
  const data_fim_string = document.getElementById("filtro-data").value;

  // Cria um objeto Date a partir da string de data de fim.
  // Inicialmente, data_fim será igual a data_inicio, pois estamos usando o mesmo valor.
  const data_fim = new Date(data_fim_string);

  // Ajusta a data de fim para ser um dia após a data de início.
  // O método setDate() altera o dia do mês da data_fim.
  data_fim.setDate(data_inicio.getDate() + 1);

  console.log(`Filtrar por data: ${data_inicio} - ${data_fim}`);
  fetch("http://10.89.240.84:5000/reservas/v1/sala", {
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
      const salaLista = document.getElementById("sala-list-tabela"); //Obtém o elemento da tabela onde os dados das salas estão
      salaLista.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

      // Verifica se há salas retornadas e as adiciona à tabela
      data.salas.forEach((sala) => {
        // Cria uma nova linha da tabela
        const tr = document.createElement("tr"); // Cria uma nova linha da tabela

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
          window.location.href = "./sala.html"; // Redireciona para a página de detalhes da sala
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

  console.log(`Nome da sala: ${nome}`);
  fetch("http://10.89.240.84:5000/reservas/v1/sala", {
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
          window.location.href = "./sala.html"; // Redireciona para a página de detalhes da sala
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
