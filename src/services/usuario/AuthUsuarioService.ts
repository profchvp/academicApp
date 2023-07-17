import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

interface AuthRequest {
    email: string;
    password: string
}
class AuthUsuarioService {
    async execute({ email, password }: AuthRequest) {
        //verificar se email existe
        const usuario = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if (!usuario) {
            throw new Error("Usuario/senha não encontrado")
        }
        //verificar se a senha está correta
        const passwordMatch = await compare(password, usuario.password)

        if (!passwordMatch) {
            throw new Error("Usuario/senha não encontrado.")
        }
        //gerar um token JWT e devolver dados do usuário (Id, nome, email)
        const token = sign({
            nome: usuario.nome,
            email: usuario.email
        },
            process.env.JWT_SECRET,{
                subject:usuario.id,
                expiresIn:'30d'
            }
        )
        return {
            id:usuario.id,
            nome:usuario.nome,
            email:usuario.email,
            "token": token }

    }
}
export { AuthUsuarioService }   