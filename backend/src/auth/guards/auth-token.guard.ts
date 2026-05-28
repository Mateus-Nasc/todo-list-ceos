import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import jwtConfig from '../config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../auth.constants';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService, //jwtmodule é o módulo que tem o serviço de jwt, e ele tem um método chamado verifyAsync, que é o método que eu vou usar para verificar se o token é válido ou não
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigService: ConfigType<typeof jwtConfig>, //ConfigModule é o módulo que tem o serviço de configuração, e ele tem um método chamado get, que é o método que eu vou usar para pegar as configurações do jwt, como secret, audience, issuer e expiresIn
  ) {} //tanto o jwtmodule e configmodule são exportados no authmodule, e como o authmodule é importado no appmodule, eu posso usar esses serviços em qualquer lugar do meu sistema, inclusive nesse guard

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException(
        'Token de autenticação ausente ou inválido',
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfigService,
      );
      // console.log(payload);
      request[REQUEST_TOKEN_PAYLOAD_KEY] = payload; //aqui eu estou colocando o payload do token no request, para que eu possa usar esse payload em outros lugares do meu sistema, como nos controllers ou serviços, para pegar informações do usuário logado, como id ou email
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true; //true se o token for válido
  }
  //esse Request é para vim do express
  extractTokenFromRequest(request: Request): string | undefined {
    const authorization = request.headers?.authorization;
    if (!authorization || typeof authorization !== 'string') {
      return undefined;
    }
    return authorization.split(' ')[1];
  }
}
