export class ReservasDatabase {
  constructor() {
    this.reservas = [];
    this.proximoId = 1;
  }

  listarTodos() {
    return this.reservas;
  }

  buscarPorId(id) {
    return this.reservas.find(r => r.id === id) || null;
  }

  inserir(dados) {
    const novaReserva = {
      id: this.proximoId++,
      responsavel: dados.responsavel,
      laboratorio: dados.laboratorio,
      data: dados.data,
      turno: dados.turno,
      capacidadeSolicitada: dados.capacidadeSolicitada,
      finalidade: dados.finalidade,
      ativa: true,
      dataCriacao: new Date().toISOString()
    };

    this.reservas.push(novaReserva);
    return novaReserva;
  }

  atualizar(id, dadosAtualizados) {
    const index = this.reservas.findIndex(r => r.id === id);
    if (index === -1) return null;

    this.reservas[index] = {
      ...this.reservas[index],
      ...dadosAtualizados,
      id
    };

    return this.reservas[index];
  }

  remover(id) {
    const index = this.reservas.findIndex(r => r.id === id);
    if (index === -1) return false;

    this.reservas.splice(index, 1);
    return true;
  }

  cancelar(id) {
    const reserva = this.buscarPorId(id);
    if (!reserva) return null;

    reserva.ativa = false;
    return reserva;
  }

  reativar(id) {
    const reserva = this.buscarPorId(id);
    if (!reserva) return null;

    reserva.ativa = true;
    return reserva;
  }
}