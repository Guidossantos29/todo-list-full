

import { Request, Response } from 'express';
import { TarefasService } from '../service/TarefasService';



class TarefasController {
    async create(req: Request, res: Response) {
        const tarefasService = new TarefasService()
        try {
            const { nome, custo, dataLimite, ordemApresentacao } = req.body;
            const tarefa = await tarefasService.createTarefa(nome, custo, dataLimite);
            return res.status(201).json(tarefa);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Erro ao criar tarefa");
            }

        }
    }
    async get(req: Request, res: Response) {
        const tarefasService = new TarefasService()
        try {
            const tarefa = await tarefasService.getAllTarefas()
            res.status(200).json(tarefa)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Erro ao buscar tarefas");
            }
        }
    }

    async getTarefasById(req: Request, res: Response) {
        const { id } = req.params
        const tarefasService = new TarefasService()
        try{
            const tarefa = await tarefasService.getTarefasById(parseInt(id))
            res.json(tarefa)
        }catch(error){
            if (error instanceof Error) {
                throw new Error("Erro ao buscas tarefa");
            }

        }
        

    }

    async update(req: Request, res: Response){
        const { id } = req.params;
        const { nome, custo, dataLimite, ordemApresentacao } = req.body;
        const tarefasService = new TarefasService()

        try{
            const tarefa = await tarefasService.update(
                parseInt(id),
                nome,
                custo,
                new Date(dataLimite),
                ordemApresentacao
            )

            return res.status(200).json(tarefa)

        } catch(error){
            if (error instanceof Error) {
                throw new Error("Erro ao editar tarefa");
            }
        }
    }

    async delete(req: Request, res: Response){
        const { id } = req.params
        const tarefasService = new TarefasService()

        try{
            const tarefa = await tarefasService.delete(parseInt(id))
            res.status(200).json(tarefa)
        } catch(error){
            if (error instanceof Error) {
                throw new Error("Erro ao deletar tarefa");
            }
        }
    }


}

export { TarefasController }