import {Request, Response} from "express"
import {prisma} from "../../config/prisma"
import { handleErrors } from "../helpers/handleErros"

export default {
    create: async (request: Request, response: Response) => {
        try{
            const { nome, email, admin, Senha, agenciaIds } = request.body
            
            if(!nome || !email || !Senha){
                return response.status(400).json("Dados incompletos.")
            }

            const data: any = {
                nome,
                email,
                admin: admin || false,
                Senha
            }

            if(agenciaIds) {
                data.agencias = { connect: agenciaIds.map((id: number) => ({ id })) }
            }

            const funcionario = await prisma.funcionario.create({
                data
            })
            return response.status(201).json(funcionario)
        }catch(e){
            return handleErrors(e, response)
        }
    },

    list: async (request: Request, response: Response) => {
        try{
            const funcionarios = await prisma.funcionario.findMany({
                include: { agencias: true }
            })
            return response.status(200).json(funcionarios)
        }catch(e){
            handleErrors(e, response)
        }
    },

    getById: async (request: Request, response: Response) => {
        try{
            const { id } = request.params
            const funcionario = await prisma.funcionario.findUnique({
                where: { id: +id }
            })
            return response.status(200).json(funcionario)
        }catch(e){
            handleErrors(e, response)
        }
    },

    update: async (request: Request, response: Response) => {
        try{
            const { id } = request.params
            const { nome, email, admin, Senha } = request.body

            const funcionario = await prisma.funcionario.update({
                data: {
                    nome,
                    email,
                    admin,
                    Senha
                },
                where: { id: +id }
            })
            return response.status(200).json(funcionario)
        }catch(e){
            handleErrors(e, response)
        }
    },

    delete: async (request: Request, response: Response) => {
        try{
            const { id } = request.params
            const funcionario = await prisma.funcionario.delete({ where: { id: +id } })
            return response.status(200).json(funcionario)
        }catch(e){
            handleErrors(e, response)
        }
    }
}