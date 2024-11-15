const connect = require("../db/connect"); // Importa o módulo de conexão com o banco de dados

module.exports = class AgendamentoController {
  static async createReserva(req, res) {
    // Extrai os dados do corpo da requisição
    const { fk_id_usuario, fk_id_sala, datahora_inicio, datahora_fim } =
      req.body;

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!fk_id_usuario || !fk_id_sala || !datahora_inicio || !datahora_fim) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // A consulta SQL agora verifica se já existe uma reserva que se sobreponha
    const queryHorario = `SELECT datahora_inicio, datahora_fim FROM reserva WHERE fk_id_sala = ? AND (
        (datahora_inicio < ? AND datahora_fim > ?) OR  -- Novo horário começa antes e termina depois da reserva existente
        (datahora_inicio < ? AND datahora_fim > ?) OR  -- Novo horário começa antes e termina depois da reserva existente
        (datahora_inicio >= ? AND datahora_inicio < ?) OR  -- Novo horário começa dentro de um horário já reservado
        (datahora_fim > ? AND datahora_fim <= ?) -- Novo horário termina dentro de um horário já reservado
      )`;

    const valuesHorario = [
      fk_id_sala,
      datahora_inicio,
      datahora_inicio,
      datahora_inicio,
      datahora_fim,
      datahora_inicio,
      datahora_fim,
      datahora_inicio,
      datahora_fim,
    ];

    try {
      const limiteHora = 60 * 60 * 1000; // 1 hora em milissegundos

      // Verifica se já existe alguma reserva conflitante no horário
      const [resultadosH] = await connect
        .promise()
        .query(queryHorario, valuesHorario);

      if (new Date(datahora_fim) - new Date(datahora_inicio) > limiteHora) {
        return res
          .status(400)
          .json({ error: "O tempo de reserva excede o limite (1h)" });
      }

      // Se houver qualquer reserva que se sobreponha
      if (resultadosH.length > 0) {
        return res
          .status(400)
          .json({ error: "A sala escolhida já está reservada neste horário" });
      }

      // Construção da query INSERT para agendar a sala
      const queryInsert = `INSERT INTO reserva (fk_id_usuario, fk_id_sala, datahora_inicio, datahora_fim)
                          VALUES (?, ?, ?, ?)`;
      const valuesInsert = [
        fk_id_usuario,
        fk_id_sala,
        datahora_inicio,
        datahora_fim,
      ];

      // Realiza o agendamento (inserção)
      await connect.promise().query(queryInsert, valuesInsert);

      return res.status(201).json({ message: "Sala reservada com sucesso!" });
    } catch (err) {
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }
};
