const connect = require("../db/connect"); // Importa o módulo de conexão com o banco de dados

module.exports = class salaController {
  // Estrutura os campos do corpo da requisição
  static async createSalas(req, res) {
    const { nome, descricao, bloco, tipo, capacidade } = req.body;

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!nome || !descricao || !bloco || !tipo || !capacidade) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Construção da query INSERT para adicionar o usuário ao banco de dados
    const query = `INSERT INTO sala (nome, descricao, bloco, tipo, capacidade) VALUES (?, ?, ?, ?, ?)`;
    const values = [nome, descricao, bloco, tipo, capacidade];

    try {
      connect.query(query, values, function (err) {
        if (err) {
          console.error(err);
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
              error: "O nome da sala já existe",
            });
          }
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }
        return res.status(201).json({ message: "Sala Criada com Sucesso!" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }

  // Método para obter todos os usuários
  static async getAllSalasTabela(req, res) {
    const query = `SELECT * FROM sala`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }
        return res
          .status(200)
          .json({ message: "Obtendo todos as salas", salas: results });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }

  // Método para atualizar dados de um usuário
  static async updateSala(req, res) {
    const { nome, descricao, bloco, tipo, capacidade } = req.body;
    const salaId = req.params.id_sala;

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!nome || !descricao || !bloco || !tipo || !capacidade) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Query para atualizar os dados do usuário
    const query = `UPDATE sala SET nome = ?, descricao = ?, bloco = ?, tipo = ?, capacidade = ? WHERE id_sala = ?`;
    const values = [nome, descricao, bloco, tipo, capacidade, salaId];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
              error: "O nome da sala já existe",
            });
          }
          return res.status(500).json({ error: "Erro interno no servidor" });
        }

        // Verifica se o usuário foi encontrado e atualizado
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Sala não encontrada" });
        }
        return res
          .status(200)
          .json({ message: "Sala atualizada com sucesso" });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  // Método para excluir um usuário
  static async deleteSala(req, res) {
    const salaId = req.params.id_sala;
    const query = `DELETE FROM sala WHERE id_sala = ?`;
    const values = [salaId];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          if (err.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(400).json({error: "A sala está vinculada a uma reserva, e não pode ser excluida",});
          }
          console.error(err);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }

        // Verifica se o usuário foi encontrado e excluído
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Sala não encontrada" });
        }
        return res
          .status(200)
          .json({ message: "Sala excluída com sucesso" });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};
