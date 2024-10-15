document
  .getElementById("formulario-cadastro") //  seleciona o elemento com o id indicado no <form> 'formulario-registro'
  .addEventListener("submit", function (event) {
    // adiciona o ouvinte do evento 'submit'
    event.preventDefault(); // previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
    const nome_usuario = document.getElementById("nome_usuario").value; // capturar os valores dos campos do formulário pelo id
    const NIF = document.getElementById("NIF").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // requisição http para o endpoint de cadastro de usuário

    fetch("http://localhost:5000/reservas/v1/cadastro", {
      // realiza uma chamada HTTP para o servidor (a rota definida)
      method: "POST",
      headers: {
        // a requisição será em formato JSON
        "Content-Type": "application/json",
      },
      // transforma os dados do formulário em uma string json para serem enviados no corpo da requisição
      body: JSON.stringify({ nome_usuario, NIF, senha, email }),
    })
      .then((response) => {
        // tratamento da resposta do servidor / api
        if (response.ok) {
          // verifica se a resposta foi bem-sucedida (status: 20*)
          return response.json();
        } // --- fechamento 'response.ok'
        // convertendo o erro em formato JSON
        return response.json().then((err) => {
          // mensagem retornada do servidor, acessa pela chave 'error'
          throw new Error(err.error);
        }); // --- fechamento 'response error'
      }) // --- fechamento 'response'
      .then((data) => {
        // executa a resposta de sucesso  - retorna ao usuario final
        // exibe alerta com o nome do usuario com o nome que acabou de ser cadastrado (front)
        alert("Usuário cadastrado com sucesso! - app");
        // exibe o log no terminal

        // limpa os campos do formulario, após o sucesso do cadastro
        window.location.href = "principal.html";
      }) // --- fechamento 'data'
      //captura qualquer erro que ocorra durante o processo de requisição/ resposta
      .catch((error) => {
        // exibe alerta no (front) com erro processado
        alert("Erro no cadastro: " + error.message);
        console.error("Erro:", error.message);
      }); // --- fechamento 'catch(error)'
  });

document
  .getElementById("formulario-login") //  seleciona o elemento com o id indicado no <form> 'formulario-registro'
  .addEventListener("submit", function (event) {
    event.preventDefault(); // previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
    const usuario = document.getElementById("usuario").value; // capturar os valores dos campos do formulário pelo id
    const senha = document.getElementById("senha").value;

    fetch("http://localhost:5000/reservas/v1/login", {
      // realiza uma chamada HTTP para o servidor (a rota definida)
      method: "POST",
      headers: {
        // a requisição será em formato JSON
        "Content-Type": "application/json",
      },
      // transforma os dados do formulário em uma string json para serem enviados no corpo da requisição
      body: JSON.stringify({ usuario, senha }),
    })
      .then((response) => {
        // tratamento da resposta do servidor / api
        if (response.ok) {
          // verifica se a resposta foi bem-sucedida (status: 20*)
          return response.json();
        } // --- fechamento 'response.ok'
        // convertendo o erro em formato JSON
        return response.json().then((err) => {
          // mensagem retornada do servidor, acessa pela chave 'error'
          throw new Error(err.error);
        }); // --- fechamento 'response error'
      }) // --- fechamento 'response'
      .then((data) => {
        // executa a resposta de sucesso  - retorna ao usuario final
        // exibe alerta com o nome do usuario com o nome que acabou de ser cadastrado (front)
        alert("Login bem sucedido!");
        window.location.href = "principal.html";
      }) // --- fechamento 'data'
      //captura qualquer erro que ocorra durante o processo de requisição/ resposta
      .catch((error) => {
        // exibe alerta no (front) com erro processado
        alert("Erro no Login: " + error.message);
        console.error("Erro:", error.message);
      }); // --- fechamento 'catch(error)'
  });
