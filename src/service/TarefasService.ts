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

}

export { TarefasService }