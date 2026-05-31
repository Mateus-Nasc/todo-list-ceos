import {
  ConflictException,
  ForbiddenException,
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
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly hashingService: HashingService,
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    if (createUsuarioDto.senha !== createUsuarioDto.confirmarSenha) {
      throw new ConflictException('As senhas digitadas não são iguais');
    }

    try {
      const senhaHash = await this.hashingService.hash(createUsuarioDto.senha);
      createUsuarioDto.senha = senhaHash;

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
    if (id !== tokenPayload.sub) {
      throw new UnauthorizedException(`Você não pode acessar outro perfil`);
    }

    return await this.findOne(id);
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
    tokenPayload: TokenPayloadDto,
  ) {
    if (id !== tokenPayload.sub) {
      throw new ForbiddenException(`Você não pode alterar outro perfil`);
    }
    const { senha, ...dadosUsuario } = updateUsuarioDto;

    if (senha) {
      dadosUsuario['senha'] = await this.hashingService.hash(senha);
    }

    const usuario = await this.usuarioRepository.preload({
      id: id,
      ...dadosUsuario,
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
