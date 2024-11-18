import { Tarefa } from './../node_modules/.prisma/client/index.d';
import express, { Request, Response } from "express"
import cors from 'cors';
import { PrismaClient } from "@prisma/client";


const app = express();
const prisma = new PrismaClient();

app.use(cors())
app.use(express.json())

app.get("/tarefas", async (req: Request, res: Response) => {
    const tarefas = await prisma.tarefa.findMany({
        orderBy: { ordemApresentacao: "asc" }
    })

    res.json(tarefas)
})
app.post("tarefas", async (req: Request, res: Response) => {
    const { nome, custo, datalimite } = req.body
    const ordemApresentacao = (await prisma.tarefa.count()) + 1;
    

    try {
        const Tarefa = await prisma.tarefa.create({
            data: {
                nome,
                custo,
                dataLimite: new Date(datalimite),
                ordemApresentacao,
    
            },
    
        })
        res.json(Tarefa)

    } catch(error){
        if(error instanceof Error){
            res.status(400).json({ error: error.message });
        }
       
    }
})

