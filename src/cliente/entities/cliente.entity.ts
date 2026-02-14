import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Seguro } from '../../seguro/entities/seguro.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_clientes' })
export class Cliente {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome!: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ example: 'email@email.com.br' })
  email!: string;

  @Column({ length: 5000 })
  @ApiProperty()
  foto!: string;

  @OneToMany(() => Seguro, (seguro) => seguro.cliente)
  @ApiProperty()
  seguro?: Seguro[];
}
