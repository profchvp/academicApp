import { Request, response, Response } from "express";
import { CreateUsuarioService } from '../../services/usuario/CreateUsuarioService';

class CreateUsuarioController {
    async handle(req: Request, res: Response) {
        const { nome, email, password } = req.body;

        const createUsuarioService = new CreateUsuarioService();
        const usuario = await createUsuarioService.execute({
            nome,
            email,
            password
        })

        return res.json(usuario)
    }
}
export { CreateUsuarioController }