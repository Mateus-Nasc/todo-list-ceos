import { Module } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { TarefasController } from './tarefas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { Lista } from 'src/listas/entities/lista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarefa, Lista])],
  controllers: [TarefasController],
  providers: [TarefasService],
})
export class TarefasModule {}
