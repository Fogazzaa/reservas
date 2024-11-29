const connect = require("../db/connect"); // Importa o módulo de conexão com o banco de dados

module.exports = class usuarioController {
  // Estrutura os campos do corpo da requisição
  static async createUsuarios(req, res) {
    const { NIF, email, senha, nome } = req.body;

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!NIF || !email || !senha || !nome) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Valida se o NIF é numérico e tem 7 dígitos
    if (isNaN(NIF) || NIF.length !== 7) {
      return res.status(400).json({
        error: "NIF inválido. Deve conter exatamente 7 dígitos numéricos",
      });
    }

    // Valida se o email contém o caractere "@"
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }

    // Construção da query INSERT para adicionar o usuário ao banco de dados
    const query = `INSERT INTO usuario (nome, email, NIF, senha) VALUES (?, ?, ?, ?)`;
    const values = [nome, email, NIF, senha];

    try {
      connect.query(query, values, function (err) {
        if (err) {
          console.error(err);
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
              error: "O NIF ou email já está vinculado a outro usuário",
            });
          }
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }
        return res.status(200).json({
          message: "Cadastro bem-sucedido",
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }

  // Método para realizar login de um usuário
  static async loginUsuario(req, res) {
    const { senha, email } = req.body;

    // Valida se todos os campos obrigatórios estão devidamente preenchidos
    if (!senha || !email) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Consulta para verificar se o email existe no banco de dados
    const query = `SELECT * FROM usuario WHERE email = ?`;
    const values = [email];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }

        // Verifica se o usuário foi encontrado
        if (results.length === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const usuario = results[0];
        console.log(usuario);

        // Verifica se a senha está correta
        if (usuario.senha === senha) {
          return res.status(200).json({
            message: "Login realizado com sucesso!",
            usuario: {
              id_usuario: usuario.id_usuario,
              email: usuario.email,
              nome: usuario.nome,
            },
          });
        } else {
          return res.status(401).json({ error: "Senha ou E-mail incorreto" });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }

  // Método para obter todos os usuários
  static async getAllUsuarios(req, res) {
    const query = `SELECT * FROM usuario`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }
        return res
          .status(200)
          .json({ message: "Obtendo todos os usuários", usuarios: results });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }

  // Método para atualizar dados de um usuário
  static async updateUsuario(req, res) {
    const { email, senha, nome } = req.body;
    const usuarioId = req.params.id_usuario;

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!email || !senha || !nome) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Valida se o email contém o caractere "@"
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }

    // Query para atualizar os dados do usuário
    const query = `UPDATE usuario SET email = ?, senha = ?, nome = ? WHERE id_usuario = ?`;
    const values = [email, senha, nome, usuarioId];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
              error: "O email já está vinculado a outro usuário",
            });
          }
          return res.status(500).json({ error: "Erro interno no servidor" });
        }

        // Verifica se o usuário foi encontrado e atualizado
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res
          .status(200)
          .json({ message: "Usuário atualizado com sucesso" });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  // Método para excluir um usuário
  static async deleteUsuario(req, res) {
    const usuarioId = req.params.id_usuario;
    const query = `DELETE FROM usuario WHERE id_usuario = ?`;
    const values = [usuarioId];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }

        // Verifica se o usuário foi encontrado e excluído
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuario não encontrado" });
        }
        return res
          .status(200)
          .json({ message: "Usuario excluído com sucesso" });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async getUsuarioById(req, res) {
    const id_usuario = req.params.id_usuario;

    if (!id_usuario) {
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    const query = `SELECT * FROM usuario WHERE id_usuario = ?`; // Ajuste o campo `id` conforme o banco

    connect.query(query, [id_usuario], function (err, results) {
      if (err) {
        console.error("Erro ao buscar usuário:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Supondo que você tenha reservas relacionadas ao usuário
      const usuario = results[0];
      const queryUsuario = `SELECT * FROM usuario WHERE id_usuario = ?`;

      connect.query(queryUsuario, [id_usuario], function (err) {
        if (err) {
          console.error("Erro ao buscar reservas:", err);
          return res
            .status(500)
            .json({ error: "Erro interno ao buscar reservas" });
        }

        return res.status(200).json({
          usuario: {
            id_usuario: usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email,
            NIF: usuario.NIF,
            senha: usuario.senha,
          },
        });
      });
    });
  }

  static async getUsuarioReservas(req, res) {
    const fk_id_usuario = req.params.fk_id_usuario; // Obtendo o ID do usuário a partir da URL
  
    // Consulta SQL para buscar as reservas do usuário
    const queryReservas = `
      SELECT r.id_reserva, s.nome, r.datahora_inicio, r.datahora_fim
      FROM reserva r
      JOIN sala s ON r.fk_id_sala = s.id_sala
      WHERE r.fk_id_usuario = ?
    `;
  
    try {
      // Executando a consulta SQL
      connect.query(queryReservas, [fk_id_usuario], (err, results) => {
        if (err) {
          console.error("Erro ao buscar reservas:", err);
          return res.status(500).json({ error: "Erro ao buscar reservas" });
        }
  
        // Se não encontrar reservas, retornar uma lista vazia
        if (results.length === 0) {
          return res.status(200).json({ reservas: [] });
        }
  
        // Caso encontre reservas, retornar os dados encontrados
        return res.status(200).json({ reservas: results });
      });
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};
