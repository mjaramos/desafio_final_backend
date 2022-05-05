import { connect } from './mongo.db.js';
import LivroInfoSchema from '../schemas/livroInfo.schema.js';

async function createLivroInfo(livroInfo) {
  try {
    const mongoose = await connect();
    const LivroInfo = mongoose.model('LivroInfo', LivroInfoSchema);
    livroInfo = new LivroInfo(livroInfo);
    await livroInfo.save();
  } catch (error) {
    throw error;
  }
}

async function updateLivroInfo(livroInfo) {
  try {
    const mongoose = await connect();
    const LivroInfo = mongoose.model('LivroInfo', LivroInfoSchema);
    await LivroInfo.findOneAndUpdate(
      {
        livroId: livroInfo.livroId,
      },
      livroInfo
    );
  } catch (error) {
    throw error;
  }
}

async function deleteLivroInfo(livroId) {
  try {
    const mongoose = await connect();
    const LivroInfo = mongoose.model('LivroInfo', LivroInfoSchema);
    await LivroInfo.deleteOne({ livroId });
  } catch (error) {
    throw error;
  }
}

async function createAvaliacao(avaliacao, livroInfoId) {
  try {
    const livroInfo = await getLivroInfo(livroInfoId);
    livroInfo.avaliacoes.push(avaliacao);
    await updateLivroInfo(livroInfo);
  } catch (error) {
    throw error;
  }
}

async function deleteAvaliacao(livroId, index) {
  try {
    const livroInfo = await getLivroInfo(livroId);
    livroInfo.avaliacoes.splice(index, 1);
    await updateLivroInfo(livroInfo);
  } catch (error) {
    throw error;
  }
}

async function getLivroInfos() {
  try {
    const mongoose = await connect();
    const LivroInfo = mongoose.model('LivroInfo', LivroInfoSchema);
    const query = LivroInfo.find({});
    return await query.exec();
  } catch (error) {
    throw error;
  }
}

async function getLivroInfo(livroId) {
  try {
    const mongoose = await connect();
    const LivroInfo = mongoose.model('LivroInfo', LivroInfoSchema);
    const query = LivroInfo.findOne({ livroId });
    const retorno = await query.exec();
    return retorno;
  } catch (error) {
    throw error;
  }
}

export default {
  createLivroInfo,
  updateLivroInfo,
  deleteLivroInfo,
  createAvaliacao,
  getLivroInfos,
  getLivroInfo,
  deleteAvaliacao,
};
