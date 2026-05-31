import {
  IsString,
  MinLength,
  IsInt,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateTarefaDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo titulo não pode estar vazio' })
  @MinLength(4, { message: 'O titulo deve ter pelo menos 4 caracteres' })
  titulo!: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo descricao não pode estar vazio' })
  @MinLength(4, { message: 'O descricao deve ter pelo menos 4 caracteres' })
  descricao!: string;

  @IsOptional()
  @IsBoolean()
  completada?: boolean;

  @IsInt()
  usuarioId!: number;
}
