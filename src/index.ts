import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { TarefasController } from './controllers/tarefaController';
import { setupSwagger } from './swagger/swagger';
import { TarefasService } from './service/TarefasService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bem-vindo à API de Tarefas!");
});

setupSwagger(app);

/**
 * @swagger
 * /tarefas:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - custo
 *               - dataLimite
 *               - ordemApresentacao
 *             properties:
 *               nome:
 *                 type: string
 *               custo:
 *                 type: number
 *               dataLimite:
 *                 type: string
 *                 format: date
 *               ordemApresentacao:
 *                 type: number
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Erro na requisição
 */
app.post("/tarefas", async (req: Request, res: Response) => {
  const tarefaController = new TarefasController();
  try {
    await tarefaController.create(req, res);
  } catch (error) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /tarefas:
 *   get:
 *     summary: Retorna todas as tarefas
 *     tags: [Tarefas]
 *     responses:
 *       200:
 *         description: Lista de tarefas
 */
app.get("/tarefas", async (req: Request, res: Response) => {
  const tarefaController = new TarefasController();
  try {
    await tarefaController.get(req, res);
  } catch (error) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /tarefas/{id}:
 *   get:
 *     summary: Retorna uma tarefa específica pelo ID
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *       404:
 *         description: Tarefa não encontrada
 */
app.get("/tarefas/:id", async (req: Request, res: Response) => {
  const tarefaController = new TarefasController();
  try {
    await tarefaController.getTarefasById(req, res);
  } catch (error) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /tarefas/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               custo:
 *                 type: number
 *               dataLimite:
 *                 type: string
 *                 format: date
 *               ordemApresentacao:
 *                 type: number
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
app.put("/tarefas/:id", async (req: Request, res: Response) => {
  const tarefaController = new TarefasController();
  try {
    await tarefaController.update(req, res);
  } catch (error) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /tarefas/{id}:
 *   delete:
 *     summary: Remove uma tarefa pelo ID
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
app.delete("/tarefas/:id", async (req: Request, res: Response) => {
  const tarefaController = new TarefasController();
  try {
    await tarefaController.delete(req, res);
  } catch (error) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /tarefas/reorder/{id}:
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
app.put("/tarefas/reorder/:id", async (req: Request, res: Response): Promise<any> => {
  const { id, novaOrdem } = req.body;

  const tarefasService = new TarefasService();

  try {
    if (!id || novaOrdem === undefined) {
      return res.status(400).json({ error: "ID e nova ordem são obrigatórios." });
    }

    const tarefa = await tarefasService.updateOrder(Number(id), Number(novaOrdem));
    return res.status(200).json(tarefa);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
