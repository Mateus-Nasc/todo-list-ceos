import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TarefasModule } from './tarefas/tarefas.module';

@Module({
  imports: [UsuariosModule, TarefasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
