import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarefa } from './entities/tarefa.entity';

@Injectable()
export class TarefasService {
  constructor(
    @InjectRepository(Tarefa) private tarefaRepository: Repository<Tarefa>
  ){}

  //retorna todas as tarefas de um usuário
  async findAll(userId: number){
    return this.tarefaRepository.find({
      where:{
        usuario:{
          id: userId
        }
      }
    })
  }


  //retorna a tarefa de determinado id
  async findOne(userId: number, taskId: number){
    const tarefa = await this.tarefaRepository.findOne({
      where: {
        id: taskId,
        usuario:{
          id: userId
        }
      }
    })

    if(!tarefa){
      throw new NotFoundException({
        message: 'Tarefa não encontrada'
      })
    }

    return tarefa
  }
  
  //cria uma nova tarefa
  async create(userId: number, createTarefaDto: CreateTarefaDto){
    const tarefa = this.tarefaRepository.create({
      ...createTarefaDto,
      usuario:{
        id: userId
      }
    })
    return this.tarefaRepository.save(tarefa)
  }

  //atualiza uma tarefa
  async update(userId: number, taskId: number, updateTarefaDto: UpdateTarefaDto){
    const tarefa = await this.tarefaRepository.findOne({
      where: {
        id: taskId,
        usuario:{
          id: userId
        }
      }
    })

    if(!tarefa){
      throw new NotFoundException({
        message: 'Tarefa não encontrada'
      });
    }

    Object.assign(tarefa, updateTarefaDto)
    return await this.tarefaRepository.save(tarefa)
  }

  //deletar uma tarefa
  async delete(userId: number, taskId: number){
    const tarefa = await this.tarefaRepository.findOne({
      where:{
        id: taskId,
        usuario:{
          id: userId
        }
      }
    })

    if(!tarefa){
      throw new NotFoundException({
        message: 'Tarefa não encontrada'
      })
    }

    await this.tarefaRepository.delete(taskId)

    return {
      message: 'Tarefa excluída com sucesso'
    }
  }
}
