import AutorRepository from '../repositories/autor.repository.js';
import LivroRepository from '../repositories/livro.repository.js';

async function createAutor(autor) {
  return await AutorRepository.insertAutor(autor);
}

async function updateAutor(autor) {
  return await AutorRepository.updateAutor(autor);
}

async function deleteAutor(id) {
  const livros = await LivroRepository.getLivrosByAutor(id);
  if (!livros) {
    throw new Error(
      'Não pode excluir autor pois o mesmo já tem livro associado.'
    );
  }
  await AutorRepository.deleteAutor(id);
}

async function getAutores() {
  return await AutorRepository.getAutores();
}

async function getAutor(id) {
  return await AutorRepository.getAutor(id);
}

export default {
  createAutor,
  getAutores,
  getAutor,
  deleteAutor,
  updateAutor,
};
