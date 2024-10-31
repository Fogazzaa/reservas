const connect = require("../db/connect"); // Importa o módulo de conexão com o banco de dados

module.exports = class usuarioController {
  //module.exports = compartilha funções, objetos ou classes entre diferentes aplicações.
  // e essa classe é um modelo para criar objetos.

  // Estrutura os campos do corpo da requisição
  static async createUsuarios(req, res) {
    const { NIF, email, senha, nome_usuario } = req.body;

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!NIF || !email || !senha || !nome_usuario) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });

      // Valida se o NIF é numérico e tem 7 dígitos
    } else if (isNaN(NIF) || NIF.length !== 7) { //verificar se o valor do NIF é um número válido
      return res.status(400).json({error: "NIF inválido. Deve conter exatamente 7 dígitos numéricos",});

      // Valida se o email contém o caractere "@"
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } else {
      // Construção da query INSERT para adicionar o usuário ao banco de dados
      const query = `INSERT INTO usuario (nome_usuario,email,NIF,senha) VALUES(
      '${nome_usuario}',
      '${email}',
      '${NIF}',
      '${senha}')`;

      // Executando a query criada
      try {
        //lida com exceções, ou seja, é uma maneira de capturar e tratar erros
        connect.query(query, function (err) {
<<<<<<< HEAD
          if (err) {
            console.log(err);
            console.log(err.code);
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(400).json({
                error: "O NIF ou email já está vinculado a outro usuário",
              });
            } // if
            else {
              return res
                .status(500)
                .json({ error: "Erro Interno do Servidor" });
            } // else
          } // if
          else {
            return res.status(201).json({
              message: "Usuário Criado com Sucesso!",
            });
          } // else
        }); // connect
      } catch (error) {
        console.error(error);
=======
          if (err) {  //Faz parte do tratamento de erros
            console.log(err); // imprime o erro
            console.log(err.code); // imprime o código do erro
            if (err.code === "ER_DUP_ENTRY") { // Verifica se o erro é por chave duplicada
              return res.status(400).json({error: "O NIF ou e-mail já está vinculado a outro usuário",});
            } else {
              return res.status(500).json({ error: "Erro Interno do Servidor" });
            }
          } else {
            return res.status(201).json({message: "Usuário cadastrado com sucesso!!",});
          }
        });
      } catch (error) { //capturar e tratar erros
        console.error(error); // Imprime o erro
>>>>>>> c985ac43dd195a3ebf46475e67a97b437822ec53
        res.status(500).json({ error: "Erro Interno de Servidor" });
      }
    }
  } // createUsuarios

  // Método para realizar login de um usuário
  static async loginUsuario(req, res) {
    const { senha, email } = req.body;

    // Valida se todos os esses campos obrigatórios estão devidamente preenchidos
    if (!senha || !email) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    } else {
      // Consulta para verificar se o email existe no banco de dados
      const query = `SELECT * FROM usuario WHERE email = '${email}'`;

      try {
        //lida com exceções, ou seja, é uma maneira de capturar e tratar erros
        // Executando a query
        connect.query(query, function (err, results) {
          if (err) { //Faz parte do tratamento de erros
            console.log(err); // Imprime o erro
            return res.status(500).json({ error: "Erro Interno do Servidor" });
          }

          // Verifica se o usuário foi encontrado
          if (results.length === 0) { //determina se não retornou nenhum resultado
            return res.status(404).json({ error: "Usuário não encontrado" });
          }

          const usuario = results[0]; // Obtém o primeiro resultado

          // Verifica se a senha está correta
          if (usuario.senha === senha) {
            return res.status(200).json({message: "Login realizado com sucesso!",});
          } else {
<<<<<<< HEAD
            return res.status(401).json({ error: "Senha ou E-mail incorreto" });
=======
            return res.status(401).json({ error: "E-mail ou Senha incorretos" });
>>>>>>> c985ac43dd195a3ebf46475e67a97b437822ec53
          }
        });
      } catch (error) { //captura e trata erros
        console.error(error); //imprime erros
        return res.status(500).json({ error: "Erro Interno do Servidor" });
      }
    }
  } // loginUsuario

  // Método para obter todos os usuários
  static async getAllUsuarios(req, res) {
    const query = `SELECT * FROM usuario`; //Consulta para selecionar todos os usuários

    try {
      //lida com exceções, ou seja, é uma maneira de capturar e tratar erros
      connect.query(query, function (err, results) {
        
        if (err) { //Faz parte do tratamento de erros
          console.error(err); // Imprime o erro
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }

        // Retorna a lista de usuários encontrados
        return res.status(200).json({message: "Obtendo todos os usuários",usuarios: results});
      });

    } catch (error) { //captura e trata erros
      console.error(error); // Imprime o erro
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }

  // Método para atualizar dados de um usuário
  static async updateUsuario(req, res) {
    const { NIF, email, senha, nome_usuario } = req.body;
    const usuarioId = req.params.id_usuario; // Obtém o ID do usuário da URL

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!NIF || !email || !senha || !nome_usuario) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Query para atualizar os dados do usuário
    const query = `UPDATE usuario SET NIF = ?, email = ?, senha = ?, nome_usuario = ? WHERE id_usuario = ?`;
    //consulta SQL que atualiza as informações de um usuário específico na tabela usuario

    //declara uma constante chamada values com os valores que serão usados na execução
    const values = [NIF, email, senha, nome_usuario, usuarioId];

    try { //lida com exceções, ou seja, é uma maneira de capturar e tratar erros
      connect.query(query, values, function (err, results) {
        if (err) {//Faz parte do tratamento de erros         
          console.error(err); // Imprime o erro

          return res.status(500).json({ error: "Erro interno no servidor" });
        }
        // Verifica se o usuário foi encontrado e atualizado
        if (results.affectedRows === 0) { //determina se uma operação no banco de dados foi bem-sucedida.
          return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res.status(200).json({ message: "Usuário atualizado com sucesso" });
      });
    } catch (error) { //captura e trata erros
      console.error(error); // Imprime o erro
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  // Método para excluir um usuário
  static async deleteUsuario(req, res) {
    //permite que você utilize esse valor para operações de manipulação de dados

    const usuarioId = req.params.id_usuario; //extrai o valor do parâmetro id e o armazena no usuarioId
    const query = `DELETE FROM usuario WHERE id_usuario = ?`; // Query para deletar o usuário
    const values = [usuarioId]; //passa valores pro usuarioId

    try {
      connect.query(query, values, function (err, results) { //executa a consulta SQL passando valores necessários 
        //tratando possíveis erros e processando resultados.
        if (err) { //Faz parte do tratamento de erros
          console.error(err); // Loga o erro
          return res.status(500).json({ error: "Erro interno no servidor" });
        }
        // Verifica se o usuário foi encontrado e excluído
        if (results.affectedRows === 0) { //determina se uma operação no banco de dados foi bem-sucedida.
          return res.status(404).json({ error: "Usuario não encontrado" });
        }

        return res.status(200).json({ message: "Usuario excluído com sucesso" });
      });
    } catch (error) { //captura e trata erros
      console.error(error); //imprime erros
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};
