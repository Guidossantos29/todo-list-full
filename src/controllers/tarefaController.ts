
import { Request, Response } from 'express';
import { TarefasService } from '../service/TarefasService';



class TarefasController {
    async create(req: Request, res: Response) {
        const tarefasService = new TarefasService()
        try {
            const { nome, custo, dataLimite, ordemApresentacao } = req.body;
            const tarefa = await tarefasService.createTarefa(nome, custo, dataLimite, ordemApresentacao);
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
            const tarefa = await tarefasService.getAllTarefas
            res.status(201).json(tarefa)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Erro ao criar tarefa");
            }
        }
    }

    async getTarefasById(req: Request, res: Response){

    }


}

export { TarefasController }