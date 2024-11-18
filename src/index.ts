import express from 'express';
import cors from 'cors';
import { Request,Response } from 'express';

import { TarefasController } from './controllers/tarefaController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.post("/tarefas", async (req:Request,res: Response) => {
    const tarefaController = new TarefasController()
    try {  
        await tarefaController.create

    } catch (error){
        if (error instanceof Error) {
            res.json({ error: error.message })
        }
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
