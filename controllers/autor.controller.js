import AutorService from '../services/autor.service.js';

async function createAutor(req, res, next) {
  try {
    let autor = req.body;
    if (!autor.nome || !autor.email || !autor.telefone) {
      throw new Error('Nome, email, e telefone são obrigatórios.');
    }
    autor = await AutorService.createAutor(autor);
    res.send(autor);
    logger.info(`POST /autor - ${JSON.stringify(autor)}`);
  } catch (error) {
    next(error);
  }
}

async function updateAutor(req, res, next) {
  try {
    let autor = req.body;
    if (!autor.autorId || !autor.nome || !autor.email || !autor.telefone) {
      throw new Error('Autor_Id, Nome, email, e telefone são obrigatórios.');
    }
    autor = await AutorService.updateAutor(autor);
    res.send(autor);
    logger.info(`PUT /autor - ${JSON.stringify(autor)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteAutor(req, res, next) {
  try {
    let id = req.params.id;
    await AutorService.deleteAutor(id);
    res.end();
    logger.info(`DELETE /autor/:{id}`);
  } catch (error) {
    next(error);
  }
}

async function getAutor(req, res, next) {
  try {
    let id = req.params.id;
    res.send(await AutorService.getAutor(id));
    logger.info(`GET /autor/:{id}`);
  } catch (error) {
    next(error);
  }
}

async function getAutores(req, res, next) {
  try {
    res.send(await AutorService.getAutores());
    logger.info('GET /autor');
  } catch (error) {
    next(error);
  }
}

export default {
  createAutor,
  getAutores,
  getAutor,
  deleteAutor,
  updateAutor,
};
