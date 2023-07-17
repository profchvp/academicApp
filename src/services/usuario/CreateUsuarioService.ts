import prismaClient    from "../../prisma";
import { hash } from "bcryptjs";
interface UsuarioRequest {
    nome: string;
    email: string;
    password: string
}
class CreateUsuarioService {
    async execute({ nome, email, password }: UsuarioRequest) {
        //verificar envio de dados
        if (!email) {
            throw new Error("Email é obrigatório")
        }
        //verificar se email ja existe
        const usuarioJaExiste = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if (usuarioJaExiste) {
            throw new Error("Usuário Cadastrado Anteriormente")
        }

        //criptogrando
        const passwordHash = await hash(password,8)

        const usuario = await prismaClient.user.create({
            data: {
                nome: nome,
                email: email,
                password: passwordHash
            },
            select:{
                id:true,
                nome:true,
                email:true
            }
        })
        return usuario;
    }
}
export { CreateUsuarioService }