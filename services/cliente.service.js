import ClienteRepository from '../repositories/cliente.repository.js';
import VendaRepository from '../repositories/venda.repository.js';
import basicAuth from 'express-basic-auth';

async function createCliente(cliente) {
  return await ClienteRepository.insertCliente(cliente);
}

async function updateCliente(cliente) {
  return await ClienteRepository.updateCliente(cliente);
}

async function deleteCliente(id) {
  const vendaByCliente = await VendaRepository.getVendasByClienteId(id);
  if (!vendaByCliente) {
    throw new Error(
      'Não pode excluir cliente pois o mesmo já tem venda associada.'
    );
  }
  await ClienteRepository.deleteCliente(id);
}

async function getClientes() {
  return await ClienteRepository.getClientes();
}

async function getCliente(id) {
  return await ClienteRepository.getCliente(id);
}

async function verificaLogin(email, pass) {
  const cliente = await ClienteRepository.verificaLogin(email);
  if (!cliente) {
    return false;
  }
  return basicAuth.safeCompare(cliente.senha, pass);
}

async function getClienteByEmail(email) {
  return await ClienteRepository.verificaLogin(email);
}

export default {
  createCliente,
  getClientes,
  getCliente,
  deleteCliente,
  updateCliente,
  verificaLogin,
  getClienteByEmail,
};
