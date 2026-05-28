import { IsOptional, IsString, MinLength, IsInt, IsNotEmpty } from 'class-validator'

export class CreateTarefaDto {
    @IsString()
    @IsNotEmpty({ message: 'O campo titulo não pode estar vazio' })
    @MinLength(4, { message: 'O titulo deve ter pelo menos 4 caracteres' })
    titulo!: string;

    @IsOptional()
    @IsString()
    @MinLength(4, { message: 'O descricao deve ter pelo menos 4 caracteres' })
    descricao?: string;

    @IsInt()
    usuarioId!: number;
}
