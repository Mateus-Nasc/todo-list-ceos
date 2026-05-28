import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column , CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Tarefa {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    titulo!: string;

    @Column({ nullable: true })
    descricao?: string;

    @Column({ default: false })
    completada!: boolean;

    @ManyToOne(() => Usuario, (usuario) => usuario.tarefas, {
        onDelete: 'CASCADE'
    })
    usuario!: Usuario;

    @CreateDateColumn()
    criadoEm!: Date;
}