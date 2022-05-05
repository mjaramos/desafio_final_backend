import ClienteService from '../services/cliente.service.js';
import VendaService from '../services/venda.service.js';
import { getRole } from './auth.controller.js';

async function createVenda(req, res, next) {
  try {
    let venda = req.body;
    if (!venda.data || !venda.clienteId || !venda.livroId) {
      throw new Error('Os campos data, clienteId e livroId são obrigatórios');
    }
    venda = await VendaService.createVenda(venda);
    res.send(venda);
    logger.info(`POST /venda - ${JSON.stringify(venda)}`);
  } catch (error) {
    next(error);
  }
}

async function getVenda(req, res, next) {
  try {
    res.send(await VendaService.getVenda(req.params.id));
    logger.info(`GET /venda/:id - ${JSON.stringify(id)}`);
  } catch (error) {
    next(error);
  }
}

async function getVendas(req, res, next) {
  try {
    if (req.query.clienteId && getRole(req.auth.user) === 'cliente') {
      const cliente = await ClienteService.getClienteByEmail(req.auth.user);
      if (parseInt(req.query.clienteId) !== cliente.clienteId) {
        throw new Error('Cliente não pode ver vendas de outro cliente');
      }
    }
    res.send(
      await VendaService.getVendas(
        req.query.clienteId,
        req.query.livroId,
        req.query.autorId
      )
    );
    logger.info(`GET /venda`);
  } catch (error) {
    next(error);
  }
}

export default {
  createVenda,
  getVenda,
  getVendas,
};
