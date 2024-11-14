const router = require('express').Router();//importando o módolo express

const reservaController = require('../controllers/reservaController');
const usuarioController = require("../controllers/usuarioController");

router.post("/cadastro", usuarioController.createUsuarios); // http://localhost:5000/reservas/v1/cadastro
router.post("/login", usuarioController.loginUsuario); // http://localhost:5000/reservas/v1/login
router.get("/login", usuarioController.getAllUsuarios); // http://localhost:5000/reservas/v1/login
router.put("/usuario/:id_usuario", usuarioController.updateUsuario); // http://localhost:5000/reservas/v1/usuario/id_usuario
router.delete("/usuario/:id_usuario", usuarioController.deleteUsuario); // http://localhost:5000/reservas/v1/usuario/id_usuario


router.get("/reserva", reservaController.createReserva); // http://localhost:5000/reservas/v1/reserva
router.post("/reserva", reservaController.createReserva); // http://localhost:5000/reservas/v1/reserva

module.exports = router;

//Exportândo a instância de express configurada, para que seja acessada em outros arquivos