import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    if (createUsuarioDto.senha !== createUsuarioDto.confirmarSenha) {
      throw new ConflictException('As senhas digitadas não são iguais');
    }

    try {
      const { confirmarSenha, ...dadosParaSalvar } = createUsuarioDto;

      const usuarioNovo = this.usuarioRepository.create(dadosParaSalvar);
      return await this.usuarioRepository.save(usuarioNovo);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Este e-mail já está cadastrado');
      }
      throw error;
    }
  }

  async findAll() {
    //aqui retorna os usuários com as tarefas relacionadas
    return await this.usuarioRepository.find({ relations: { tarefas: true } });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: { tarefas: true },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    return usuario;
  }
  async findProfile(id: number, tokenPayload: TokenPayloadDto) {
    // Verificar se o usuário é o próprio usuário autenticado
    if (id !== tokenPayload.sub) {
      throw new UnauthorizedException(`Você não pode acessar outro perfil`);
    }

    return await this.findOne(id);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.preload({
      id: id,
      ...updateUsuarioDto,
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number, tokenPayload: TokenPayloadDto) {
    //verifico se o usuário é o próprio usuário autenticado
    if (id !== tokenPayload.sub) {
      throw new UnauthorizedException(`Você não pode excluir outro perfil`);
    }

    const usuario = await this.findOne(id);
    return await this.usuarioRepository.remove(usuario);
  }
}
