

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
        try {
            const tarefa = await tarefasService.getTarefasById(parseInt(id))
            res.json(tarefa)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Erro ao buscas tarefa");
            }

        }


    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, custo, dataLimite, ordemApresentacao } = req.body;
        const tarefasService = new TarefasService()

        try {
            const tarefa = await tarefasService.update(
                parseInt(id),
                nome,
                custo,
                new Date(dataLimite),
                ordemApresentacao
            )

            return res.status(200).json(tarefa)

        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Erro ao editar tarefa");
            }
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        const tarefasService = new TarefasService()

        try {
            const tarefa = await tarefasService.delete(parseInt(id))
            res.status(200).json(tarefa)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Erro ao deletar tarefa");
            }
        }
    }




    /**
 * @swagger
 * /tarefas/reorder:
 *   put:
 *     summary: Atualiza a ordem de uma tarefa existente
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID da tarefa a ser reordenada
 *               novaOrdem:
 *                 type: integer
 *                 description: Nova posição da tarefa na lista
 *     responses:
 *       200:
 *         description: Ordem da tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da tarefa
 *                 nome:
 *                   type: string
 *                   description: Nome da tarefa
 *                 custo:
 *                   type: number
 *                   description: Custo da tarefa
 *                 dataLimite:
 *                   type: string
 *                   format: date
 *                   description: Data limite da tarefa
 *                 ordemApresentacao:
 *                   type: integer
 *                   description: Ordem de apresentação da tarefa após a atualização
 *       400:
 *         description: ID e nova ordem são obrigatórios e devem ser números
 *       500:
 *         description: Erro no servidor
 */
    async updateOrder(req: Request, res: Response) {
        const { id, novaOrdem } = req.body;

       

        const tarefasService = new TarefasService();

        try {
            const tarefa = await tarefasService.updateOrder(id, novaOrdem);
            return res.status(200).json(tarefa);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
        }
    }




}

export { TarefasController }