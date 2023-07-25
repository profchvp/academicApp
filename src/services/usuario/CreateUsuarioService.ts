import prismaClient    from "../../prisma";
import { hash } from "bcryptjs";
enum Papel {
    valor1="ALUNO",
    valor2="PROFESSOR"
  }
interface UsuarioRequest {
    nome: string;
    email: string;
    password: string;
    role    : Papel;
}

class CreateUsuarioService {
    async execute({ nome, email, password, role }: UsuarioRequest) {
        //verificar envio de dados
        if (!email) {
            throw new Error("Email é obrigatório")
        }
        //verificar envio de dados
        if (!role) {
            throw new Error("Papel (role) do usuário é obrigatório")
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
                password: passwordHash,
                role:role,
            },
            select:{
                id:true,
                nome:true,
                email:true,
                role:true
            }
        })
        return usuario;
    }
}
export { CreateUsuarioService }