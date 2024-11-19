import prismaClient from "../prisma";


class TarefasService {
    async createTarefa(nome: string, custo: number, dataLimite: Date, ordemApresentacao: number) {
        try {
            const tarefa = await prismaClient.tarefa.create({
                data: {
                    nome,
                    custo,
                    dataLimite,
                    ordemApresentacao
                }
            });
            return tarefa;
        } catch (error) {
            throw new Error("Erro ao criar tarefa: " + error);
        }
    }

    async getAllTarefas() {
        try {
            const tarefas = await prismaClient.tarefa.findMany();
            return tarefas
        } catch (error) {
            throw new Error("Erro ao buscar tarefas");

        }
    }

    async getTarefasById(id: number) {
        try {
            const tarefas = await prismaClient.tarefa.findUnique({
                where: {
                    id
                }

            });

            if (!tarefas) {
                throw new Error("Tarefa não encontrada");
            }

            return tarefas

        } catch (error) {
            throw new Error("Erro ao buscar tarefa");
        }

    }

    async update(id: number, nome: string, custo: number, dataLimite: Date, ordemApresentacao: number) {
        try {

            const tarefa = await prismaClient.tarefa.update({
                where: {
                    id
                },
                data: {
                    id,
                    nome,
                    custo,
                    dataLimite,
                    ordemApresentacao,
                }

                
            })

            return tarefa

        } catch (error) {
            throw new Error("Erro ao buscar tarefa");
        }
    }

}

export { TarefasService }