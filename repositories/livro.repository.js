import Autor from '../models/autor.model.js';
import Livro from '../models/livro.model.js';

async function insertLivro(livro) {
  try {
    return await Livro.create(livro);
  } catch (error) {
    throw error;
  }
}

async function updateLivro(livro) {
  try {
    await Livro.update(
      {
        valor: livro.valor,
        estoque: livro.estoque,
      },
      {
        where: {
          livroId: livro.livroId,
        },
      }
    );
    return await getLivro(livro.livroId);
  } catch (error) {
    throw error;
  }
}

async function deleteLivro(id) {
  try {
    return await Livro.destroy({
      where: {
        livroId: id,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function getLivro(id) {
  try {
    return await Livro.findByPk(id, { raw: true });
  } catch (error) {
    throw error;
  }
}

async function getLivros() {
  try {
    return await Livro.findAll();
  } catch (error) {
    throw error;
  }
}

async function getLivrosByAutor(autorId) {
  try {
    return await Livro.findAll({
      include: [
        {
          model: Autor,
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

export default {
  insertLivro,
  updateLivro,
  deleteLivro,
  getLivro,
  getLivros,
  getLivrosByAutor,
};
