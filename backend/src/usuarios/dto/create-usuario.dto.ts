import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo nome não pode estar vazio' })
  @MinLength(4, { message: 'O nome deve ter pelo menos 4 caracteres' })
  @MaxLength(60)
  nome!: string;

  @IsEmail({}, { message: 'Insira um e-mail válido' })
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo senha não pode estar vazio' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  senha!: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo {confirmar Senha} não pode estar vazio' })
  confirmarSenha!: string;
}
