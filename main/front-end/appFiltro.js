
document.addEventListener("DOMContentLoaded", getAllSalasTabelaFiltroData);
document.addEventListener("DOMContentLoaded", getAllSalasTabelaFiltroHorario);

function getAllSalasTabelaFiltroData(){
  fetch(`http://localhost:5000/reservas/v1/salasdisponiveldata`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });

  const inputDateTime = document.getElementById("filtro-data");
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const formattedNow = `${year}-${month}-${day}`;
  inputDateTime.min = formattedNow;
}

function getAllSalasTabelaFiltroHorario(){
  fetch(`http://localhost:5000/reservas/v1/salasdisponivelhorario`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Dados recebidos:", data);
    })
    .catch((error) => {
      console.error("Erro ao buscar as salas disponíveis:", error);
    });

  const inputDateTime = document.getElementById("filtro-horario");
  if (inputDateTime) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const formattedNow = `${hours}:${minutes}`;
    inputDateTime.min = formattedNow;
  } else {
    console.error("Elemento com ID 'filtro-horario' não encontrado.");
  }
}
