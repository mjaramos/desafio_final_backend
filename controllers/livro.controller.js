import LivroService from '../services/livro.service.js';

async function createLivro(req, res, next) {
  try {
    let livro = req.body;
    if (!livro.nome || !livro.valor || !livro.autorId || !livro.estoque) {
      throw new Error('Nome, valor, estoque e autorId são obrigatórios.');
    }
    livro = await LivroService.createLivro(livro);
    res.send(livro);
    logger.info(`POST /livro - ${JSON.stringify(livro)}`);
  } catch (error) {
    next(error);
  }
}

async function updateLivro(req, res, next) {
  try {
    let livro = req.body;
    if (!livro.livroId || !livro.valor) {
      throw new Error('Livro_Id e valor são obrigatórios.');
    }
    if (livro.nome || livro.autorId) {
      throw new Error(
        'Os campos nome e autorId não são permitidos para a atualização.'
      );
    }
    livro = await LivroService.updateLivro(livro);
    res.send(livro);
    logger.info(`PUT /livro - ${JSON.stringify(livro)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteLivro(req, res, next) {
  try {
    let id = req.params.id;
    await LivroService.deleteLivro(id);
    res.end();
    logger.info(`DELETE /livro/:{id}`);
  } catch (error) {
    next(error);
  }
}

async function getLivro(req, res, next) {
  try {
    let id = req.params.id;
    res.send(await LivroService.getLivro(id));
    logger.info(`GET /livro/:{id}`);
  } catch (error) {
    next(error);
  }
}

async function getLivros(req, res, next) {
  try {
    res.send(await LivroService.getLivros(req.query.autorId));
    logger.info('GET /livro');
  } catch (error) {
    next(error);
  }
}

async function createLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;
    if (!livroInfo.livroId) {
      throw new Error('livroId é obrigatório');
    }
    await LivroService.createLivroInfo(livroInfo);
    logger.info(`POST /livro/info - ${JSON.stringify(livroInfo)}`);
    res.end();
  } catch (error) {
    next(error);
  }
}

async function updateLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;
    if (!livroInfo.livroId) {
      throw new Error('livroId é obrigatório');
    }
    await LivroService.updateLivroInfo(livroInfo);
    logger.info(`PUT /livro/info - ${JSON.stringify(livroInfo)}`);
    res.end();
  } catch (error) {
    next(error);
  }
}

async function deleteLivroInfo(req, res, next) {
  try {
    res.send(await LivroService.deleteLivroInfo(req.params.id));
    logger.info(`DELETE /livro/info/:id`);
    res.end();
  } catch (error) {
    next(error);
  }
}

async function createAvaliacao(req, res, next) {
  try {
    let livroId = req.params.id;
    let params = req.body;
    if (!livroId || !params.avaliacao) {
      throw new Error('Os campos nota e descrição são obrigatórios.');
    }
    await LivroService.createAvaliacao(params.avaliacao, livroId);
    res.end();
  } catch (error) {
    next(error);
  }
}

async function deleteAvaliacao(req, res, next) {
  try {
    await LivroService.deleteAvaliacao(req.params.id, req.params.index);
    logger.info(`DELETE /livro/:id/avaliacao/:index`);
    res.end();
  } catch (error) {
    next(error);
  }
}

async function getLivrosInfo(req, res, next) {
  try {
    res.send(await LivroService.getLivrosInfo());
    logger.info('GET /livroInfo');
  } catch (error) {
    next(error);
  }
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
