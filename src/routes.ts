import { Router, Request, Response } from 'express'

import { CreateUsuarioController } from './controllers/usuario/CreateUsuarioController'
import { AuthUsuarioController } from './controllers/usuario/AuthUsuarioController';
import { DetailUsuarioController } from './controllers/usuario/DetailUsuarioController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

//Rotas - USUARIO
router.post('/session', new AuthUsuarioController().handle)
router.post('/usuario', new CreateUsuarioController().handle)
router.get('/me', isAuthenticated, new DetailUsuarioController().handle)

export { router }