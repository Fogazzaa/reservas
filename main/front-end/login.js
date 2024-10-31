document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("formulario-login")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
  
        fetch("http://localhost:5000/reservas/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha }),
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
            alert("Login bem sucedido!");
            window.location.href = "principal.html";
          })
          .catch((error) => {
            alert("Erro no Login: " + error.message);
            console.error("Erro:", error.message);
          });
      });
  });
  