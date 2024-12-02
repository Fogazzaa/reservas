const express = require("express"); //importando o módolo express
const cors = require("cors");
const testConnect = require("./db/testConnect");

//Define uma classe para organizar a lógica da aplicação
class AppController {
  constructor() {
    //Cria uma nova instância
    //criar a instância do Express dentro da classe
    this.express = express();
    //Chama o método middlewares para configurar os middlewares
    //middlewares:Permite a comunicação e o gerenciamento de dados para aplicativos distribuídos
    this.middlewares();
    //Chama o método routes para definir as rotas da Api
    this.routes();
    testConnect();
  }
  middlewares() {
    //Permitir que a aplicação receba dados em formato JSON nas requisições(solicitação)
    this.express.use(express.json());
    this.express.use(cors());
  }
  //Define as rotas da nossa Api
  routes() {
    //URL base:
    const apiRoutes = require("./routes/apiRoutes");
    this.express.use("/reservas/v1", apiRoutes);
    //Então a rota será: http://10.89.240.84:5000/reservas/v1
  }
}
//Exportândo a instância de express configurada, para que seja acessada em outros arquivos
module.exports = new AppController().express;
