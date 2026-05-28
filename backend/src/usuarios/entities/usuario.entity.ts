import { Exclude } from 'class-transformer';
import { Tarefa } from 'src/tarefas/entities/tarefa.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 60 })
  nome!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  @Exclude()
  senha!: string;

  @OneToMany(() => Tarefa, (tarefa) => tarefa.usuario)
  tarefas!: Tarefa[];
}
