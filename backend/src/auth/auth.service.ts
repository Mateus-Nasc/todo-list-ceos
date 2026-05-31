import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly hashingService: HashingService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigService: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {
    console.log(jwtConfigService);
  }
  async login(loginDto: LoginDto) {
    const usuario = await this.usuarioRepository.findOneBy({
      email: loginDto.email,
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isPasswordValid = await this.hashingService.compare(
      loginDto.senha,
      usuario.senha,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida');
    }

    // aqui gera um novo token ou seja assina um novo token
    // e entrega para o usuario, para isso vou usar o serviço do JWT
    const accessToken = this.jwtService.signAsync(
      {
        sub: usuario.id,
        email: usuario.email,
      },
      {
        audience: this.jwtConfigService.audience,
        issuer: this.jwtConfigService.issuer,
        secret: this.jwtConfigService.secret,
        expiresIn: this.jwtConfigService.expiresIn,
      },
    );

    return { accessToken: await accessToken };
  }
}
