import ClienteService from '../services/cliente.service.js';
import { getRole } from './auth.controller.js';

async function createCliente(req, res, next) {
  try {
    let cliente = req.body;
    if (
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error(
        'Nome, email, senha, telefone e endereço são obrigatórios.'
      );
    }
    cliente = await ClienteService.createCliente(cliente);
    res.send(cliente);
    logger.info(`POST /cliente - ${JSON.stringify(cliente)}`);
  } catch (error) {
    next(error);
  }
}

async function updateCliente(req, res, next) {
  try {
    let cliente = req.body;

    if (cliente.clienteId && getRole(req.auth.user) === 'cliente') {
      const clienteVerify = await ClienteService.getClienteByEmail(
        req.auth.user
      );
      if (parseInt(clienteVerify.clienteId) !== cliente.clienteId) {
        throw new Error('Cliente não pode atualizar outro cliente');
      }
    }

    if (
      !cliente.clienteId ||
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error(
        'Cliente_Id, Nome, email, senha, telefone e endereço são obrigatórios.'
      );
    }
    cliente = await ClienteService.updateCliente(cliente);
    res.send(cliente);
    logger.info(`PUT /cliente - ${JSON.stringify(cliente)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteCliente(req, res, next) {
  try {
    let id = req.params.id;
    console.log(`Id: ${id}`);
    await ClienteService.deleteCliente(id);
    res.end();
    logger.info(`DELETE /cliente/:{id}`);
  } catch (error) {
    next(error);
  }
}

async function getClientes(req, res, next) {
  try {
    res.send(await ClienteService.getClientes());
    logger.info('GET /cliente');
  } catch (error) {
    next(error);
  }
}

async function getCliente(req, res, next) {
  try {
    let id = req.params.id;
    res.send(await ClienteService.getCliente(id));
    logger.info(`GET /cliente/:{id}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createCliente,
  getClientes,
  getCliente,
  deleteCliente,
  updateCliente,
};
