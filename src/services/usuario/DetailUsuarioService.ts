import prismaClient from "../../prisma";

class DetailUsuarioService {
async execute(usuario_id:string){
   const usuario =await prismaClient.user.findFirst({
    where:{
        id:usuario_id
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
export { DetailUsuarioService }