const router = require('express').Router();//importando o módolo express

const usuarioController = require("../controllers/usuarioController");

router.post("/usuario", usuarioController.createUsuarios); // http://localhost:5000/reservas/v1/usuario
router.get("/usuario", usuarioController.getAllUsuarios); // http://localhost:5000/reservas/v1/usuario
router.put("/usuario/:id_usuario", usuarioController.updateUsuario); // http://localhost:5000/reservas/v1/usuario/id_usuario
router.delete("/usuario/:id_usuario", usuarioController.deleteUsuario); // http://localhost:5000/reservas/v1/usuario/id_usuario

module.exports = router
//Exportândo a instância de express configurada, para que seja acessada em outros arquivos