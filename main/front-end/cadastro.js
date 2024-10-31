document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("formulario-cadastro")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        const nome_usuario = document.getElementById("nome_usuario").value;
        const NIF = document.getElementById("NIF").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
  
        fetch("http://localhost:5000/reservas/v1/cadastro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome_usuario, NIF, senha, email }),
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
            alert("Usuário cadastrado com sucesso!");
            window.location.href = "principal.html";
          })
          .catch((error) => {
            alert("Erro no cadastro: " + error.message);
            console.error("Erro:", error.message);
          });
      });
  });
  