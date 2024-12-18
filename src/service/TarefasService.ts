
import prismaClient from "../prisma";


class TarefasService {
    async createTarefa(nome: string, custo: number, dataLimite: Date) {
        try {

            const maxOrder = await prismaClient.tarefa.findFirst({
                orderBy:{
                    ordemApresentacao:"desc"
                },
                select:{
                    ordemApresentacao:true
                }
            })

            const ordemApresentacao = maxOrder?.ordemApresentacao !== undefined ? maxOrder.ordemApresentacao + 1 : 0;

            const tarefa = await prismaClient.tarefa.create({
                data: {
                    nome,
                    custo,
                    dataLimite: new Date(dataLimite),
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
            const tarefa = await prismaClient.tarefa.findUnique({
                where: {
                    id
                }

            });

            if (!tarefa) {
                throw new Error("Tarefa não encontrada");
            }

            return tarefa

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

    async delete(id:number){
        try {
            const tarefa = await prismaClient.tarefa.delete({
                where:{
                    id
                }
                
            })

            return tarefa 
        } catch(error){
            throw new Error("Erro ao deletar tarefa");
        }

    }

    async updateOrder(id: number, novaOrdem: number) {
      try {
          const tarefa = await prismaClient.tarefa.findUnique({
              where: { id }
          });

          if (!tarefa) {
              throw new Error("Tarefa não encontrada.");
          }

          const tarefas = await prismaClient.tarefa.findMany({
              orderBy: {
                  ordemApresentacao: "asc"
              }
          });

          const outrasTarefas = tarefas.filter(t => t.id !== id);

          
          outrasTarefas.splice(novaOrdem, 0, tarefa);

          
          for (let i = 0; i < outrasTarefas.length; i++) {
              await prismaClient.tarefa.update({
                  where: { id: outrasTarefas[i].id },
                  data: { ordemApresentacao: -1 * (i + 1) } 
              });
          }

          
          for (let i = 0; i < outrasTarefas.length; i++) {
              await prismaClient.tarefa.update({
                  where: { id: outrasTarefas[i].id },
                  data: { ordemApresentacao: i }
              });
          }

          return await prismaClient.tarefa.findUnique({
              where: { id }
          });
      } catch (error) {
          if (error instanceof Error) {
              throw new Error("Erro ao atualizar a ordem da tarefa: " + error.message);
          }
      }
  }

  }





export { TarefasService }