const connect = require("../db/connect"); // Importa o módulo de conexão com o banco de dados

module.exports = class AgendamentoController {
  static createReservas(req, res) {
    // Extrai os dados do corpo da requisição
    const { fk_id_usuario, fk_id_sala, datahora_inicio, datahora_fim } =
      req.body;

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!fk_id_usuario || !fk_id_sala || !datahora_inicio || !datahora_fim) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    const queryUsuario = `SELECT * FROM usuario WHERE id_usuario = ?`;
    const valuesUsuario = [fk_id_usuario];

    const querySala = `SELECT * FROM sala WHERE id_sala = ?`;
    const valuesSala = [fk_id_sala];

    // A consulta SQL agora verifica se já existe uma reserva que se sobreponha
    const queryHorario = `SELECT datahora_inicio, datahora_fim FROM reserva WHERE fk_id_sala = ? AND (
        (datahora_inicio < ? AND datahora_fim > ?) OR  
        (datahora_inicio < ? AND datahora_fim > ?) OR  
        (datahora_inicio >= ? AND datahora_inicio < ?) OR  
        (datahora_fim > ? AND datahora_fim <= ?) 
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

    connect.query(queryHorario, valuesHorario, (err, resultadosH) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao verificar horário" });
      }

      connect.query(queryUsuario, valuesUsuario, (err, resultadosU) => {
        if (err) {
          return res.status(500).json({ error: "Erro ao buscar usuário" });
        }

        connect.query(querySala, valuesSala, (err, resultadosS) => {
          if (err) {
            return res.status(500).json({ error: "Erro ao buscar sala" });
          }

          if (resultadosU.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
          }

          if (resultadosS.length === 0) {
            return res.status(404).json({ error: "Sala não encontrada" });
          }

          // Verifica se a reserva está dentro do horário permitido (8:00 - 21:00)
          if (
            new Date(datahora_inicio).getHours() < 8 ||
            new Date(datahora_inicio).getHours() >= 21
          ) {
            return res.status(400).json({
              error:
                "A reserva deve ser feita no horário de funcionamento do SENAI. Entre 8:00 e 21:00",
            });
          }

          if (
            new Date(datahora_fim).getHours() < 8 ||
            new Date(datahora_fim).getHours() >= 21
          ) {
            return res.status(400).json({
              error:
                "A reserva deve ser feita no horário de funcionamento do SENAI. Entre 8:00 e 21:00",
            });
          }

          if (
            new Date(datahora_fim) < new Date() ||
            new Date(datahora_inicio) < new Date()
          ) {
            return res.status(400).json({ error: "Data ou Horário Inválidos" });
          }

          if (
            new Date(datahora_fim).getTime() <
            new Date(datahora_inicio).getTime()
          ) {
            return res.status(400).json({ error: "Data ou Hora Inválida" });
          }

          if (
            new Date(datahora_fim).getTime() ===
            new Date(datahora_inicio).getTime()
          ) {
            return res.status(400).json({ error: "Data ou Hora Inválida" });
          }

          const limiteHora = 50 * 60 * 1000; // 1 hora em milissegundos
          if (new Date(datahora_fim) - new Date(datahora_inicio) > limiteHora) {
            return res
              .status(400)
              .json({ error: "O tempo de Reserva excede o limite (50min)" });
          }

          // Verifica se o tempo da reserva é exatamente 50 minutos (3000000 milissegundos)
          const tempoReserva =
            new Date(datahora_fim) - new Date(datahora_inicio);
          if (tempoReserva !== 50 * 60 * 1000) {
            // 50 minutos em milissegundos
            return res
              .status(400)
              .json({ error: "A reserva deve ter exatamente 50 minutos" });
          }

          // Se houver qualquer reserva que se sobreponha, sugere o primeiro horário disponível
          if (resultadosH.length > 0) {
            // Ordena os horários de reserva para verificar o próximo horário livre
            const reservasOrdenadas = resultadosH.sort(
              (a, b) => new Date(a.datahora_fim) - new Date(b.datahora_fim)
            );

            // Considerando o horário de término da última reserva
            const proximoHorarioInicio = new Date(
              reservasOrdenadas[0].datahora_fim
            );
            proximoHorarioInicio.setHours(proximoHorarioInicio.getHours() - 3); // Adiciona 10 minutos de intervalo

            const proximoHorarioFim = new Date(
              reservasOrdenadas[0].datahora_fim
            );
            proximoHorarioFim.setHours(proximoHorarioFim.getHours() - 3);
            proximoHorarioFim.setMinutes(proximoHorarioFim.getMinutes() + 50);

            return res.status(400).json({
              error: `A sala já está reservada neste horário. O primeiro horário disponível é do dia ${proximoHorarioInicio
                .toISOString()
                .replace("T", " ")
                .substring(0, 19)} até ${proximoHorarioFim
                .toISOString()
                .replace("T", " ")
                .substring(0, 19)}`,
            });
          }

          const queryInsert = `INSERT INTO reserva (fk_id_usuario, fk_id_sala, datahora_inicio, datahora_fim)
                                     VALUES (?, ?, ?, ?)`;
          const valuesInsert = [
            fk_id_usuario,
            fk_id_sala,
            datahora_inicio,
            datahora_fim,
          ];

          // Realiza o agendamento (inserção)
          connect.query(queryInsert, valuesInsert, (err, results) => {
            if (err) {
              return res.status(500).json({ error: "Erro ao criar reserva" });
            }

            return res
              .status(201)
              .json({ message: "Sala reservada com sucesso!" });
          });
        });
      });
    });
  }

  static getAllReservas(req, res) {
    const query = `SELECT * FROM reserva`;

    connect.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro Interno do Servidor" });
      }
      return res
        .status(200)
        .json({ message: "Obtendo todas as reservas", reservas: results });
    });
  }

  static updateReserva(req, res) {
    const { datahora_inicio, datahora_fim } = req.body;
    const reservaId = req.params.id_reserva;


  
    // Valida se os campos obrigatórios foram enviados
    if (!datahora_inicio || !datahora_fim) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
  
    // Função para validar horários de funcionamento
    const validaHorarioFuncionamento = (data) => {
      const hora = new Date(data).getHours();
      return hora >= 8 && hora < 21;
    };
  
    // Verifica se os horários estão no intervalo permitido
    if (
      !validaHorarioFuncionamento(datahora_inicio) ||
      !validaHorarioFuncionamento(datahora_fim)
    ) {
      return res.status(400).json({
        error: "A reserva deve ser feita no horário de funcionamento do SENAI. Entre 8:00 e 21:00",
      });
    }
  
    // Verifica se as datas são válidas
    const inicio = new Date(datahora_inicio);
    const fim = new Date(datahora_fim);
  
    if (inicio < new Date() || fim < new Date()) {
      return res.status(400).json({ error: "Data ou Horário inválidos" });
    }
  
    if (fim <= inicio) {
      return res.status(400).json({ error: "A data/hora de fim deve ser após a data/hora de início" });
    }
  
    const tempoReserva = fim - inicio;
    const limiteReserva = 50 * 60 * 1000; // 50 minutos em milissegundos
  
    if (tempoReserva !== limiteReserva) {
      return res
        .status(400)
        .json({ error: "A reserva deve ter exatamente 50 minutos" });
    }
  
    // Consulta para obter o fk_id_sala com base no id_reserva
    const querySala = `
      SELECT fk_id_sala 
      FROM reserva 
      WHERE id_reserva = ?
    `;
    const valuesSala = [reservaId];
  
    connect.query(querySala, valuesSala, (err, resultadosSala) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao consultar o banco de dados" });
      }
  
      if (resultadosSala.length === 0) {
        return res
          .status(404)
          .json({ error: "Reserva não encontrada" });
      }
  
      const fk_id_sala = resultadosSala[0].fk_id_sala;
  
      // Verifica conflitos de horário
      const queryHorario = `
        SELECT datahora_inicio, datahora_fim 
        FROM reserva 
        WHERE fk_id_sala = ? 
          AND id_reserva != ? 
          AND (
            (datahora_inicio < ? AND datahora_fim > ?) OR
            (datahora_inicio < ? AND datahora_fim > ?) OR
            (datahora_inicio >= ? AND datahora_inicio < ?) OR
            (datahora_fim > ? AND datahora_fim <= ?)
          )
      `;
      const valuesHorario = [
        fk_id_sala,
        reservaId,
        datahora_inicio,
        datahora_inicio,
        datahora_inicio,
        datahora_fim,
        datahora_inicio,
        datahora_fim,
        datahora_inicio,
        datahora_fim,
      ];
  
      connect.query(queryHorario, valuesHorario, (err, resultadosH) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Erro ao consultar banco de dados" });
        }
  
        if (resultadosH.length > 0) {
          // Calcula o próximo horário disponível
          const reservasOrdenadas = resultadosH.sort(
            (a, b) => new Date(a.datahora_fim) - new Date(b.datahora_fim)
          );
  
          const proximoHorarioInicio = new Date(reservasOrdenadas[0].datahora_fim);
          proximoHorarioInicio.setHours(proximoHorarioInicio.getHours() - 3);
  
          const proximoHorarioFim = new Date(proximoHorarioInicio);
          proximoHorarioFim.setMinutes(proximoHorarioFim.getMinutes() + 50);
  
          return res.status(400).json({
            error: `A sala já está reservada neste horário. O próximo horário disponível é de ${proximoHorarioInicio
              .toISOString()
              .replace("T", " ")
              .substring(0, 19)} até ${proximoHorarioFim
              .toISOString()
              .replace("T", " ")
              .substring(0, 19)}`,
          });
        }
  
        // Atualiza a reserva
        const queryUpdate = `
          UPDATE reserva 
          SET datahora_inicio = ?, datahora_fim = ? 
          WHERE id_reserva = ?
        `;
        const valuesUpdate = [datahora_inicio, datahora_fim, reservaId];
  
        connect.query(queryUpdate, valuesUpdate, (err, results) => {
          if (err) {
            return res.status(500).json({ error: "Erro ao atualizar reserva" });
          }
  
          return res
            .status(200)
            .json({ message: "Reserva atualizada com sucesso!" });
        });
      });
    });
  }
  

  static deleteReserva(req, res) {
    const reservaId = req.params.id_reserva;
    const query = `DELETE FROM reserva WHERE id_reserva = ?`;
    const values = [reservaId];

    connect.query(query, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno no servidor" });
      }

      // Verifica se o usuário foi encontrado e excluído
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Reserva não encontrada" });
      }
      return res.status(200).json({ message: "Reserva excluída com sucesso" });
    });
  }
};
