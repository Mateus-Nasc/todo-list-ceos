import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarefa } from './entities/tarefa.entity';

@Injectable()
export class TarefasService {
  constructor(
    @InjectRepository(Tarefa) private tarefaRepository: Repository<Tarefa>,
  ) {}

  //cria uma nova tarefa
  async create(userId: number, createTarefaDto: CreateTarefaDto) {
    const tarefa = this.tarefaRepository.create({
      ...createTarefaDto,
      usuario: {
        id: userId,
      },
    });
    return this.tarefaRepository.save(tarefa);
  }

  //retorna todas as tarefas de um usuário
  async findAll(userId: number, search?: string, completada?: string, page?: string, limit?: string) {
    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || 10
    const offset = (pageNumber - 1) * limitNumber

    const query = this.tarefaRepository
      .createQueryBuilder('tarefa')
      .innerJoin('tarefa.usuario', 'usuario')
      .where('usuario.id = :userId', {
        userId,
      });

    if (search) {
      query.andWhere(
        'LOWER(tarefa.titulo) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }
    if(completada !== undefined){
      query.andWhere(
        'tarefa.completada = :completada',
        {
          completada: completada === 'true',
        }
      )
    }

    query.orderBy('tarefa.criadoEm', 'DESC')

    query.skip(offset).take(limitNumber);

    return query.getMany();
  }

  //retorna a tarefa de determinado id
  async findOne(userId: number, taskId: number) {
    const tarefa = await this.tarefaRepository.findOne({
      where: {
        id: taskId,
        usuario: {
          id: userId,
        },
      },
    });

    if (!tarefa) {
      throw new NotFoundException({
        message: 'Tarefa não encontrada',
      });
    }

    return tarefa;
  }

  //atualiza uma tarefa
  async update(
    userId: number,
    taskId: number,
    updateTarefaDto: UpdateTarefaDto,
  ) {
    const tarefa = await this.tarefaRepository.findOne({
      where: {
        id: taskId,
        usuario: {
          id: userId,
        },
      },
    });

    if (!tarefa) {
      throw new NotFoundException({
        message: 'Tarefa não encontrada',
      });
    }

    Object.assign(tarefa, updateTarefaDto);
    return await this.tarefaRepository.save(tarefa);
  }

  //deletar uma tarefa
  async delete(userId: number, taskId: number) {
    const tarefa = await this.tarefaRepository.findOne({
      where: {
        id: taskId,
        usuario: {
          id: userId,
        },
      },
    });

    if (!tarefa) {
      throw new NotFoundException({
        message: 'Tarefa não encontrada',
      });
    }

    await this.tarefaRepository.delete(taskId);

    return {
      message: 'Tarefa excluída com sucesso',
    };
  }
}
