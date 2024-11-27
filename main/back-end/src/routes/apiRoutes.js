const router = require("express").Router(); //importando o módolo express

const reservaController = require("../controllers/reservaController");
const usuarioController = require("../controllers/usuarioController");
const salaController = require("../controllers/salaController");

router.post("/cadastro", usuarioController.createUsuarios); // http://localhost:5000/reservas/v1/cadastro
router.post("/login", usuarioController.loginUsuario); // http://localhost:5000/reservas/v1/login
router.get("/login", usuarioController.getAllUsuarios); // http://localhost:5000/reservas/v1/login
router.put("/usuario/:id_usuario", usuarioController.updateUsuario); // http://localhost:5000/reservas/v1/usuario/id_usuario
router.delete("/usuario/:id_usuario", usuarioController.deleteUsuario); // http://localhost:5000/reservas/v1/usuario/id_usuario

router.get("/reserva", reservaController.createReservas); // http://localhost:5000/reservas/v1/reserva
router.post("/reserva", reservaController.createReservas); // http://localhost:5000/reservas/v1/reserva
router.get("/reservas", reservaController.getAllReservas); // http://localhost:5000/reservas/v1/reservas
router.put("/reserva/:id_reserva", reservaController.updateReserva); // http://localhost:5000/reservas/v1/reserva/id_reserva
router.delete("/reserva/:id_reserva", reservaController.deleteReserva); // http://localhost:5000/reservas/v1/reserva/id_reserva

router.post("/sala", salaController.createSalas); // http://localhost:5000/reservas/v1/sala
// router.get("/sala", salaController.getAllSalas); // http://localhost:5000/reservas/v1/sala
router.get("/sala", salaController.getAllSalasTabela); // http://localhost:5000/reservas/v1/sala
router.put("/sala/:id_sala", salaController.updateSala); // http://localhost:5000/reservas/v1/sala/id_sala
router.delete("/sala/:id_sala", salaController.deleteSala); // http://localhost:5000/reservas/v1/sala/id_sala
router.get("/salasDisponivelHorario", salaController.getSalasDisponiveisHorario);//http://localhost:5000/reservas/v1/salasDisponivelHorario
router.get("/salasDisponivel", salaController.getSaladisponiveis);//http://localhost:5000/reservas/v1/salasDisponivel


module.exports = router;

//Exportândo a instância de express configurada, para que seja acessada em outros arquivos
