import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';

@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Get()
  findAll(
    @Request() req,
  ){
    return this.tarefasService.findAll(req.user.id)
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntIdPipe) id: number, 
    @Request() req,
  ){
    return this.tarefasService.findOne(req.user.id, id)
  }

  @Post()
  create(
    @Body() createTarefaDto: CreateTarefaDto,
    @Request() req,
  ){
    return this.tarefasService.create(req.user.id, createTarefaDto)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntIdPipe) id: number, 
    @Body() updateTarefaDto: UpdateTarefaDto,
    @Request() req,
  ){
    return this.tarefasService.update(req.user.id, id, updateTarefaDto)
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntIdPipe) id: number,
    @Request() req,
  ){
    return this.tarefasService.delete(req.user.id, id)
  }
}
