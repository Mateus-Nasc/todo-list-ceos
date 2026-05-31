import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // ParseIntPipe,
  Request,
} from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { UseGuards } from '@nestjs/common';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@UseGuards(AuthTokenGuard)
@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Post()
  create(
    @Body() createTarefaDto: CreateTarefaDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.tarefasService.create(tokenPayload.sub, createTarefaDto);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntIdPipe) id: number,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.tarefasService.findOne(tokenPayload.sub, id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() updateTarefaDto: UpdateTarefaDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.tarefasService.update(tokenPayload.sub, id, updateTarefaDto);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntIdPipe) id: number,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.tarefasService.delete(tokenPayload.sub, id);
  }
}
