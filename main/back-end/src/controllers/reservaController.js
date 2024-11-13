const connect = require("../db/connect"); // Importa o módulo de conexão com o banco de dados

module.exports = class AgendamentoController {
  static async createReserva(req, res) {
    // Extrai os dados do corpo da requisição
    const { fk_id_usuario, fk_id_sala, horario_inicio, horario_fim, tipo } =
      req.body;

    // Valida se todos os campos obrigatórios estão preenchidos
    if (
      !fk_id_usuario ||
      !fk_id_sala ||
      !horario_inicio ||
      !horario_fim ||
      !tipo
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // A consulta SQL agora verifica se já existe uma reserva que se sobreponha
    const queryHorario =
      `SELECT horario_inicio, horario_fim FROM reserva WHERE fk_id_sala = ? AND (
        (horario_inicio < ? AND horario_fim > ?) OR  -- Novo horário começa antes e termina depois da reserva existente
        (horario_inicio < ? AND horario_fim > ?) OR  -- Novo horário começa antes e termina depois da reserva existente
        (horario_inicio >= ? AND horario_inicio < ?) OR  -- Novo horário começa dentro de um horário já reservado
        (horario_fim > ? AND horario_fim <= ?) -- Novo horário termina dentro de um horário já reservado
      )`;

    const valuesHorario = [fk_id_sala, horario_inicio, horario_inicio, horario_inicio, horario_fim, horario_inicio, horario_fim, horario_inicio, horario_fim];

    try {
      // Verifica se já existe alguma reserva conflitante no horário
      const [resultadosH] = await connect
        .promise()
        .query(queryHorario, valuesHorario);

      // Se houver qualquer reserva que se sobreponha
      if (resultadosH.length > 0) {
        return res
          .status(400)
          .json({ error: "A sala escolhida já está reservada neste horário" });
      }

      // Construção da query INSERT para agendar a sala
      const queryInsert = `INSERT INTO reserva (fk_id_usuario, fk_id_sala, horario_inicio, horario_fim, tipo)
                          VALUES (?, ?, ?, ?, ?)`;
      const valuesInsert = [
        fk_id_usuario,
        fk_id_sala,
        horario_inicio,
        horario_fim,
        tipo,
      ];

      // Realiza o agendamento (inserção)
      await connect.promise().query(queryInsert, valuesInsert);

      return res.status(201).json({ message: "Sala reservada com sucesso!" });
    } catch (err) {
      console.error(err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "A sala escolhida está em uso" });
      }
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }
};
