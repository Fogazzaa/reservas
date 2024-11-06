const connect = require("../db/connect"); // Importa o módulo de conexão com o banco de dados

module.exports = class AgendamentoController {
  static async createAgendamento(req, res) {
    // Extrai os dados do corpo da requisição
    const { fkid_usuario, fkid_sala, horario_inicio, horario_fim, tipo } =
      req.body;

    // Valida se todos os campos obrigatórios estão preenchidos
    if (
      !fkid_usuario ||
      !fkid_sala ||
      !horario_inicio ||
      !horario_fim ||
      !tipo
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Verifica o status da sala (disponibilidade)
    const querySala = "SELECT status FROM sala WHERE id_sala = ?";
    const valuesSala = [fkid_sala];
    const queryHorario = "SELECT horario_inicio and horario_fim FROM agendamento WHERE fkid_sala = ?";
    const valuesHorario = [fkid_sala];

    try {
      // Verifica se a sala está disponível
      const [resultadosQ] = await connect.promise().query(querySala, valuesSala);
      const [resultadosH] = await connect.promise().query(queryHorario, valuesHorario);

      if (resultadosQ.length === 0) {
        return res.status(404).json({ error: "Sala não encontrada" });
      }

      if (resultadosH[0].horario_inicio !== horario_inicio) {
        return res.status(400).json({ error: "A sala escolhida está em uso (Horario)" });
      }

      if (resultadosH[0].horario_fim !== horario_fim) {
        return res.status(400).json({ error: "A sala escolhida está em uso (Horario)" });
      }

      // Se a sala não estiver disponível, retorna erro
      if (resultadosQ[0].status !== 1) {
        return res.status(400).json({ error: "A sala escolhida está em uso" });
      }

      // Construção da query INSERT para agendar a sala
      const queryInsert = `INSERT INTO agendamento (fkid_usuario, fkid_sala, horario_inicio, horario_fim, tipo)
                          VALUES (?, ?, ?, ?, ?)`;
      const valuesInsert = [
        fkid_usuario,
        fkid_sala,
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
}
