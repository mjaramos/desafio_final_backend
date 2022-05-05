import Autor from '../models/autor.model.js';

async function insertAutor(autor) {
  try {
    return await Autor.create(autor);
  } catch (error) {
    throw error;
  }
}

async function updateAutor(autor) {
  try {
    await Autor.update(
      {
        nome: autor.nome,
        email: autor.email,
        telefone: autor.telefone,
      },
      {
        where: {
          autorId: autor.autorId,
        },
      }
    );
    return await getAutor(autor.autorId);
  } catch (error) {}
}

async function deleteAutor(id) {
  try {
    await Autor.destroy({
      where: {
        autorId: id,
      },
    });
  } catch (error) {}
}

async function getAutores() {
  try {
    return await Autor.findAll();
  } catch (error) {
    throw error;
  }
}

async function getAutor(id) {
  try {
    return await Autor.findByPk(id);
  } catch (error) {}
}

export default {
  insertAutor,
  getAutores,
  getAutor,
  updateAutor,
  deleteAutor,
};
