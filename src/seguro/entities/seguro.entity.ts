import { ApiProperty } from "@nestjs/swagger"
import { Transform, TransformFnParams } from "class-transformer"
import {
	IsDateString,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
	Min,
} from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Cliente } from "../../cliente/entities/cliente.entity"
import { NumericTransformer } from "../../util/numerictransformer"
import { Usuario } from "../../usuario/entities/usuario.entity"

@Entity({ name: "tb_seguros" })
export class Seguro {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id!: number

	@Transform(({ value }: TransformFnParams) => value?.trim())
	@IsNotEmpty()
	@Column({ length: 255, nullable: false })
	@ApiProperty()
	fabricante!: string

	@Transform(({ value }: TransformFnParams) => value?.trim())
	@IsNotEmpty()
	@Column({ length: 255, nullable: false })
	@ApiProperty()
	modelo!: string

	@IsOptional()
	@IsInt()
	@Min(0)
	@Column({ type: "int", default: 0 })
	@ApiProperty()
	anoFabricacao!: number

	@IsOptional()
	@IsInt()
	@Min(0)
	@Column({ type: "int", default: 0 })
	@ApiProperty()
	anoModelo!: number

	@Transform(({ value }: TransformFnParams) => value?.trim())
	@IsNotEmpty()
	@Column({ length: 255, nullable: false })
	@ApiProperty()
	placa!: string

	@IsNumber({ maxDecimalPlaces: 2 })
	@IsNotEmpty()
	@IsPositive()
	@Column({
		type: "decimal",
		precision: 10,
		scale: 2,
		transformer: new NumericTransformer(),
	})
	@ApiProperty()
	valorBase!: number

	@Column({
		type: "decimal",
		precision: 10,
		scale: 2,
		transformer: new NumericTransformer(),
	})
	@ApiProperty()
	valorDesconto!: number

	@Column({
		type: "decimal",
		precision: 10,
		scale: 2,
		transformer: new NumericTransformer(),
	})
	@ApiProperty()
	valorFinal!: number

	@ApiProperty()
	@IsDateString()
	@Column({ type: "timestamp", precision: 3, nullable: false })
	dataInicio!: Date

	@ApiProperty()
	@IsDateString()
	@Column({ type: "timestamp", precision: 3, nullable: false })
	dataFim!: Date

	@ManyToOne(() => Cliente, (cliente) => cliente.seguro, {
		onDelete: "CASCADE",
	})
	cliente!: Cliente

	@ManyToOne(() => Usuario, (usuario) => usuario.seguro, {
		onDelete: "CASCADE",
	})
	usuario!: Usuario
}
