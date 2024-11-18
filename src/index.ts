import express, { Request,Response }  from "express"
import cors from 'cors';
import { PrismaClient } from "@prisma/client";


const app = express();
const prisma = new PrismaClient();

app.use(cors())
app.use(express.json())

app.get("/tarefas", async (req: Request,res:Response) => {
    const tarefas = await prisma.tarefa.findMany({
        orderBy: { ordemApresentacao:"asc" }
    })
})
