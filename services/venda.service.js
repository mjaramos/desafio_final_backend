import VendaRepository from '../repositories/venda.repository.js';
import LivroRepository from '../repositories/livro.repository.js';
import ClienteRepository from '../repositories/cliente.repository.js';

async function createVenda(venda) {
  const cliente = await ClienteRepository.getCliente(venda.clienteId);
  if (!cliente) {
    throw new Error('O cliente não exite na base de dados');
  }

  const livro = await LivroRepository.getLivro(venda.livroId);
  if (!livro) {
    throw new Error('O livro não exite na base de dados');
  }

  if (livro.estoque < 0) {
    throw new Error('O livro não tem em estoque');
  } else {
    venda.valor = livro.valor;
    venda = await VendaRepository.insertVenda(venda);
    livro.estoque--;
    await LivroRepository.updateLivro(livro);
    return venda;
  }
}

async function getVendasClientes(clienteId) {
  return await VendaRepository.getVendasByClienteId(clienteId);
}

async function getVendasLivros(livroId) {
  return await VendaRepository.getVendasByLivroId(livroId);
}

async function getVendas(clienteId, livroId, autorId) {
  console.log(
    `Retorno do LivroId: ${livroId} e clienteId: ${clienteId} e autorId: ${autorId}`
  );
  if (livroId) {
    return await VendaRepository.getVendasByLivroId(livroId);
  }
  if (clienteId) {
    return await VendaRepository.getVendasByClienteId(clienteId);
  }
  if (autorId) {
    return await VendaRepository.getVendasByAutorId(autorId);
  }
  return await VendaRepository.getVendas();
}

async function getVenda(id) {
  return await VendaRepository.getVenda(id);
}

export default {
  createVenda,
  getVendas,
  getVenda,
  getVendasClientes,
  getVendasLivros,
};
