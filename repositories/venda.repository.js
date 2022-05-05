import Cliente from '../models/cliente.model.js';
import Venda from '../models/venda.model.js';
import Livro from '../models/livro.model.js';

async function insertVenda(venda) {
  try {
    return await Venda.create(venda);
  } catch (error) {
    throw error;
  }
}

async function getVenda(vendaId) {
  try {
    return await Venda.findByPk(vendaId);
  } catch (error) {
    throw error;
  }
}

async function getVendas() {
  try {
    return await Venda.findAll({
      include: [
        {
          model: Cliente,
        },
      ],
    });
  } catch (error) {
    throw error;
  }
}

async function getVendasByClienteId(clienteId) {
  try {
    return await Venda.findAll({
      where: {
        clienteId,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function getVendasByLivroId(livroId) {
  try {
    return await Venda.findAll({
      where: {
        livroId,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function getVendasByAutorId(autorId) {
  try {
    return await Venda.findAll({
      include: [
        {
          model: Livro,
          where: {
            autorId,
          },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
}

async function deleteVenda(id) {
  try {
    await Venda.destroy({
      where: {
        vendaId: id,
      },
    });
  } catch (error) {
    throw error;
  }
}

export default {
  insertVenda,
  getVenda,
  getVendas,
  getVendasByClienteId,
  getVendasByLivroId,
  getVendasByAutorId,
  deleteVenda,
};
