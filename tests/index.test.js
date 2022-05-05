import app from '../app.js';
import request from 'supertest';
import AutorRepository from '../repositories/autor.repository.js';
import ClienteRepository from '../repositories/cliente.repository.js';
import LivroRepository from '../repositories/livro.repository.js';
import VendaRepository from '../repositories/venda.repository.js';

jest.setTimeout(30000);

test('CENARIO', async () => {
  const autor = {
    nome: 'Autor Teste',
    email: 'autor@teste.com',
    telefone: '8512345678',
    autorId: null,
  };

  const livro = {
    nome: 'Livro Teste',
    valor: '123',
    estoque: 5,
    autorId: null,
    livroId: null,
  };

  const cliente = {
    nome: 'Cliente Teste',
    email: 'cliente@teste.com',
    senha: '123456',
    telefone: '8512345678',
    endereco: 'Endereço Teste',
    clienteId: null,
  };

  const venda = {
    valor: '123',
    data: '2020-05-04',
    clienteId: null,
    livroId: null,
    vendaId: null,
  };

  const admin = 'admin';
  const senhaAdmin = 'desafio-igti-nodejs';
  let emailCliente = cliente.email;
  let senhaCliente = cliente.senha;

  let res = await request(app)
    .post('/autor')
    .send(autor)
    .auth(admin, senhaAdmin);
  autor.autorId = res.body.autorId;
  expect(res.body).toMatchObject(autor);
  expect(res.status).toBe(200);

  res = await request(app)
    .get(`/autor/${autor.autorId}`)
    .auth(admin, senhaAdmin);
  expect(res.body).toMatchObject(autor);
  expect(res.status).toBe(200);

  livro.autorId = autor.autorId;
  res = await request(app).post('/livro').send(livro).auth(admin, senhaAdmin);
  livro.livroId = res.body.livroId;
  expect(res.body).toMatchObject(livro);
  expect(res.status).toBe(200);

  res = await request(app)
    .get(`/livro/${livro.livroId}`)
    .auth(admin, senhaAdmin);
  expect(res.body).toMatchObject(livro);
  expect(res.status).toBe(200);

  res = await request(app)
    .post('/cliente')
    .send(cliente)
    .auth(admin, senhaAdmin);
  cliente.clienteId = res.body.clienteId;
  delete cliente.senha;
  expect(res.body).toMatchObject(cliente);
  expect(res.status).toBe(200);

  res = await request(app)
    .get(`/cliente/${cliente.clienteId}`)
    .auth(admin, senhaAdmin);
  expect(res.body).toMatchObject(cliente);
  expect(res.status).toBe(200);

  res = await request(app)
    .get(`/livro/${livro.livroId}`)
    .auth(emailCliente, senhaCliente);
  expect(res.body).toMatchObject(livro);
  expect(res.status).toBe(200);

  venda.clienteId = cliente.clienteId;
  venda.livroId = livro.livroId;
  res = await request(app)
    .post('/venda')
    .send(venda)
    .auth(emailCliente, senhaCliente);
  venda.vendaId = res.body.vendaId;
  expect(res.body).toMatchObject(venda);
  expect(res.status).toBe(200);

  res = await request(app)
    .get(`/venda/${venda.vendaId}`)
    .auth(admin, senhaAdmin);
  expect(res.body).toMatchObject(venda);
  expect(res.status).toBe(200);

  await VendaRepository.deleteVenda(venda.vendaId);
  await LivroRepository.deleteLivro(livro.livroId);
  await AutorRepository.deleteAutor(autor.autorId);
  await ClienteRepository.deleteCliente(cliente.clienteId);
});
