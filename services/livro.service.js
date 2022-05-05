import LivroRepository from '../repositories/livro.repository.js';
import AutorRepository from '../repositories/autor.repository.js';
import VendaRepository from '../repositories/venda.repository.js';
import LivroInfoRepository from '../repositories/livroInfo.repository.js';

async function createLivro(livro) {
  const autor = await AutorRepository.getAutor(livro.autorId);
  if (!autor) {
    throw new Error('Autor não existente na base da dados');
  }
  return await LivroRepository.insertLivro(livro);
}

async function updateLivro(livro) {
  return await LivroRepository.updateLivro(livro);
}

async function deleteLivro(id) {
  const venda = await VendaRepository.getVendasByLivroId(id);
  if (!venda) {
    throw new Error(
      'Não pode excluir livro pois o mesmo já tem uma venda associada.'
    );
  }
  await LivroRepository.deleteLivro(id);
}

async function getLivros(autorId) {
  console.log(`AutorId: ${autorId}`);
  if (autorId) {
    return await LivroRepository.getLivrosByAutor(autorId);
  }
  return await LivroRepository.getLivros();
}

async function getLivrosInfo() {
  return await LivroInfoRepository.getLivroInfos();
}

async function getLivro(id) {
  const livro = await LivroRepository.getLivro(id);
  livro.info = await LivroInfoRepository.getLivroInfo(parseInt(id));
  console.log(`Livro: ${JSON.stringify(livro)}`);
  return livro;
}

async function createLivroInfo(livroInfo) {
  await LivroInfoRepository.createLivroInfo(livroInfo);
}

async function updateLivroInfo(livroInfo) {
  await LivroInfoRepository.updateLivroInfo(livroInfo);
}

async function deleteLivroInfo(livroInfo) {
  await LivroInfoRepository.deleteLivroInfo(livroInfo);
}

async function createAvaliacao(avaliacao, livroId) {
  await LivroInfoRepository.createAvaliacao(avaliacao, livroId);
}

async function deleteAvaliacao(livroId, index) {
  await LivroInfoRepository.deleteAvaliacao(parseInt(livroId), index);
}

export default {
  createLivro,
  getLivros,
  getLivro,
  deleteLivro,
  updateLivro,
  createLivroInfo,
  updateLivroInfo,
  deleteLivroInfo,
  createAvaliacao,
  deleteAvaliacao,
  getLivrosInfo,
};
