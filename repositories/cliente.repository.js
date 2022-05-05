import Cliente from '../models/cliente.model.js';

async function insertCliente(cliente) {
  try {
    return await Cliente.create(cliente);
  } catch (error) {
    throw error;
  }
}

async function updateCliente(cliente) {
  try {
    await Cliente.update(
      {
        nome: cliente.nome,
        email: cliente.email,
        senha: cliente.senha,
        telefone: cliente.telefone,
        endereco: cliente.endereco,
      },
      {
        where: {
          clienteId: cliente.clienteId,
        },
      }
    );
    return await getCliente(cliente.clienteId);
  } catch (error) {}
}

async function deleteCliente(id) {
  try {
    await Cliente.destroy({
      where: {
        clienteId: id,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function getClientes() {
  try {
    return await Cliente.findAll({
      attributes: { exclude: ['senha'] },
    });
  } catch (error) {
    throw error;
  }
}

async function getCliente(id) {
  try {
    return await Cliente.findOne({
      attributes: { exclude: ['senha'] },
      where: {
        clienteId: id,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function verificaLogin(email) {
  try {
    return await Cliente.findOne({
      where: {
        email,
      },
      raw: true,
    });
  } catch (error) {
    throw error;
  }
}

export default {
  insertCliente,
  getClientes,
  getCliente,
  updateCliente,
  deleteCliente,
  verificaLogin,
};
