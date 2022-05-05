import express from 'express';
import ClienteController from '../controllers/cliente.controller.js';
import { authorize } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/', authorize('admin'), ClienteController.createCliente);
router.put('/', authorize('admin', 'cliente'), ClienteController.updateCliente);
router.delete('/:id', authorize('admin'), ClienteController.deleteCliente);
router.get('/', authorize('admin'), ClienteController.getClientes);
router.get('/:id', authorize('admin'), ClienteController.getCliente);

export default router;
