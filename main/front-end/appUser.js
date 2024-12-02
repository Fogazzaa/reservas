document.addEventListener("DOMContentLoaded", function () {
  const formularioCadastro = document.getElementById("formulario-cadastro");
  const formularioLogin = document.getElementById("formulario-login");

  // Verifica se os elementos existem antes de adicionar o evento
  if (formularioCadastro) {
    formularioCadastro.addEventListener("submit", createUser);
  }
  if (formularioLogin) {
    formularioLogin.addEventListener("submit", loginUser);
  }
});

function createUser(event) {
  // adiciona o ouvinte do evento 'submit'
  event.preventDefault(); // previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
  const nome = document.getElementById("nome-cadastro").value; // capturar os valores dos campos do formulário pelo id
  const NIF = document.getElementById("NIF-cadastro").value;
  const email = document.getElementById("email-cadastro").value;
  const senha = document.getElementById("senha-cadastro").value;

  // requisição http para o endpoint de cadastro de usuário

  fetch("http://10.89.240.84:5000/reservas/v1/cadastro", {
    // realiza uma chamada HTTP para o servidor (a rota definida)
    method: "POST",
    headers: {
      // a requisição será em formato JSON
      "Content-Type": "application/json",
    },
    // transforma os dados do formulário em uma string json para serem enviados no corpo da requisição
    body: JSON.stringify({ nome, NIF, senha, email }),
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
      alert("Usuário cadastrado com sucesso!");
      localStorage.setItem("id_usuario", data.usuario.id_usuario);
      window.location.href = "principal.html";
    }) // --- fechamento 'data'

    .catch((error) => {
      // exibe alerta no (front) com erro processado
      alert("Erro no cadastro: " + error.message);
      console.error("Erro:", error.message);
    }); // --- fechamento 'catch(error)'
}

function loginUser(event) {
  event.preventDefault(); // previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
  const email = document.getElementById("email-login").value; // capturar os valores dos campos do formulário pelo id
  const senha = document.getElementById("senha-login").value;

  fetch("http://10.89.240.84:5000/reservas/v1/login", {
    // realiza uma chamada HTTP para o servidor (a rota definida)
    method: "POST",
    headers: {
      // a requisição será em formato JSON
      "Content-Type": "application/json",
    },
    // transforma os dados do formulário em uma string json para serem enviados no corpo da requisição
    body: JSON.stringify({ email, senha }),
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
      alert("Login bem sucedido!");
      localStorage.setItem("id_usuario", data.usuario.id_usuario);
      window.location.href = "principal.html";
    }) // --- fechamento 'data'
    .catch((error) => {
      // exibe alerta no (front) com erro processado
      alert("Erro no Login: " + error.message);
      console.error("Erro:", error.message);
    }); // --- fechamento 'catch(error)'
}
