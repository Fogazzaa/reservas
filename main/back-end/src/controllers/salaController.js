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

  static async getSalaReservadas(req, res) {
    // Consultas SQL para obter as salas reservadas e todas as salas
    const queryReserva = `SELECT fk_id_sala FROM reserva`;
    const querySala = `SELECT id_sala FROM sala`;

    try {
      // Realizando as consultas no banco de dados
      connect.query(queryReserva, (err, salasReservadasRows) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Erro ao obter as salas reservadas" });
        }

        connect.query(querySala, (err, salasRows) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ message: "Erro ao obter as salas disponíveis" });
          }

          // Extraindo os IDs das salas reservadas e todas as salas
          const salasReservadas = salasReservadasRows.map(
            (row) => row.fk_id_sala
          );
          const todasSalas = salasRows.map((row) => row.id_sala);

          // Filtrando as salas reservadas
          const salasSomenteReservadas = todasSalas.filter((sala) =>
            salasReservadas.includes(sala)
          );

          // Enviando a resposta
          res.status(200).json(salasSomenteReservadas);
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao obter as salas" });
    }
  }

  static async getSaladisponiveis(req, res) {
    // Consultas SQL para obter as salas reservadas e todas as salas
    const queryReserva = `SELECT fk_id_sala FROM reserva`;
    const querySala = `SELECT id_sala FROM sala`;

    try {
      // Realizando as consultas no banco de dados
      connect.query(querySala, (err, salasDisponiveisRows) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Erro ao obter as salas reservadas" });
        }

        connect.query(queryReserva, (err, salasReservadasRows) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erro ao obter as salas " });
          }

          // Extraindo os IDs das salas reservadas e todas as salas
          const salasDisponiveis = salasDisponiveisRows.map(
            (row) => row.id_sala
          );
          const salasReservadas = salasReservadasRows.map(
            (row) => row.fk_id_sala
          );

          // Filtrando as salas disponiveis
          const salasSomenteDisponiveis = salasDisponiveis.filter(
            (sala) => !salasReservadas.includes(sala)
          );

          const salasOrdenadas = salasSomenteDisponiveis.sort((a, b) => a - b);
          // Enviando a resposta
          res.status(200).json(salasOrdenadas);
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao obter as salas" });
    }
  }

  static async getSaladisponiveisHorario(req, res) {
    // Consultas SQL para obter as salas reservadas e todas as salas
    const queryReserva = `SELECT fk_id_sala FROM reserva`;
    const queryRHorario = `SELECT data_hora and data_fim FROM reserva`;
    const querySala = `SELECT id_sala FROM sala`;

    try {
      // Realizando as consultas no banco de dados
      connect.query(querySala, (err, salasDisponiveisRows) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Erro ao obter as salas reservadas" });
        }

        connect.query(queryReserva, (err, salasReservadasRows) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erro ao obter as salas " });
          }

          // Extraindo os IDs das salas reservadas e todas as salas
          const salasDisponiveis = salasDisponiveisRows.map(
            (row) => row.id_sala
          );
          const salasReservadas = salasReservadasRows.map(
            (row) => row.fk_id_sala
          );

          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erro ao obter as salas " });
          }

          // Filtrando as salas disponiveis
          const salasSomenteDisponiveis = salasDisponiveis.filter(
            (sala) => !salasReservadas.includes(sala)
          );

          const salasOrdenadas = salasSomenteDisponiveis.sort((a, b) => a - b);
          // Enviando a resposta
          res.status(200).json(salasOrdenadas);
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao obter as salas" });
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
        return res.status(200).json({ message: "Sala atualizada com sucesso" });
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
            return res
              .status(400)
              .json({
                error:
                  "A sala está vinculada a uma reserva, e não pode ser excluida",
              });
          }
          console.error(err);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }

        // Verifica se o usuário foi encontrado e excluído
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Sala não encontrada" });
        }
        return res.status(200).json({ message: "Sala excluída com sucesso" });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};
