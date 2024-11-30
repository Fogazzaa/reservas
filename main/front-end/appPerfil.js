document.addEventListener("DOMContentLoaded", () => {
  const id_usuario = localStorage.getItem("id_usuario"); // Obtém o ID do usuário armazenado no localStorage

  if (id_usuario) {
    // Fetch para obter os dados do usuário
    fetch(`http://localhost:5000/reservas/v1/usuario/perfil/${id_usuario}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.usuario) {
          // Preenche os campos com os dados do usuário
          document.getElementById("nome").value = data.usuario.nome;
          document.getElementById("email").value = data.usuario.email;
          document.getElementById("NIF").value = data.usuario.NIF;
          document.getElementById("senha").value = data.usuario.senha;

          // Carrega as reservas do usuário
          carregarReservasUsuario(id_usuario);
        } else {
          alert("Usuário não encontrado");
          window.location.href = "login.html"; // Redireciona para a página de login
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados do usuário:", error);
        alert("Erro ao carregar o perfil.");
      });
  } else {
    alert("Usuário não autenticado");
    window.location.href = "login.html";
  }
  function carregarReservasUsuario(id_usuario) {
    // Fetch para obter as reservas do usuário
    fetch(
      `http://localhost:5000/reservas/v1/usuario/perfil/${id_usuario}/reservas`
    )
      .then((response) => response.json())
      .then((data) => {
        const selectReservas = document.getElementById("reservas");
        selectReservas.innerHTML =
          '<option value="" disabled selected>Minhas Reservas</option>';
  
        // Ajustando para acessar "data.reservas"
        if (data.reservas && data.reservas.length > 0) {
          data.reservas.forEach((reserva) => {
            const option = document.createElement("option");
            option.value = reserva.id_reserva;
  
            // Verificando se a data está em um formato compatível
            const dataReserva = new Date(reserva.datahora_inicio);
            if (isNaN(dataReserva)) {
              console.error("Data inválida:", reserva.datahora_inicio);
              return; // Se a data não for válida, não adicionamos a reserva
            }
  
            // Formatando a data para "DD/MM/YYYY HH:MM"
            const dataFormatada = dataReserva.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // Formato 24 horas
            });
  
            // Definindo o texto do option com a data formatada
            option.textContent = `${reserva.nome} - ${dataFormatada}`;
            selectReservas.appendChild(option);
          });
        } else {
          const option = document.createElement("option");
          option.value = "";
          option.textContent = "Nenhuma reserva encontrada";
          selectReservas.appendChild(option);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar reservas:", error);
        alert("Erro ao buscar reservas. Tente novamente.");
      });
  }  
});
