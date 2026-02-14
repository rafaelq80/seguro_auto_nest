import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeleteResult, ILike, Repository } from "typeorm"
import { Seguro } from "../entities/seguro.entity"
import { ClienteService } from "../../cliente/services/cliente.service"

@Injectable()
export class SeguroService {
	constructor(
		@InjectRepository(Seguro)
		private SeguroRepository: Repository<Seguro>,
		private clienteService: ClienteService,
	) {}

	async findAll(): Promise<Seguro[]> {
		return await this.SeguroRepository.find({
			relations: {
				cliente: true,
				usuario: true,
			},
		})
	}

	async findById(id: number): Promise<Seguro> {
		const Seguro = await this.SeguroRepository.findOne({
			where: {
				id,
			},
			relations: {
				cliente: true,
				usuario: true,
			},
		})

		if (!Seguro) throw new HttpException("O seguro não foi encontrado!", HttpStatus.NOT_FOUND)

		return Seguro
	}

	async findByModelo(modelo: string): Promise<Seguro[]> {
		return await this.SeguroRepository.find({
			where: {
				modelo: ILike(`%${modelo}%`),
			},
			relations: {
				cliente: true,
				usuario: true,
			},
		})
	}

	async create(seguro: Seguro): Promise<Seguro> {
		if (!seguro.cliente)
			throw new HttpException(
				"Os dados do cliente não foram informados!",
				HttpStatus.BAD_REQUEST,
			)

		await this.clienteService.findById(seguro.cliente.id)

		seguro.valorDesconto = calcularDesconto(seguro)
		seguro.valorFinal = seguro.valorBase - seguro.valorDesconto

		return await this.SeguroRepository.save(seguro)
	}

	async update(seguro: Seguro): Promise<Seguro> {
		if (!seguro.id)
			throw new HttpException(
				"Os dados do seguro não foram informados!",
				HttpStatus.NOT_FOUND,
			)

		await this.findById(seguro.id)

		if (!seguro.cliente)
			throw new HttpException(
				"Os dados do cliente não foram informados!",
				HttpStatus.BAD_REQUEST,
			)

		await this.clienteService.findById(seguro.cliente.id)

		seguro.valorDesconto = calcularDesconto(seguro)
		seguro.valorFinal = seguro.valorBase - seguro.valorDesconto

		return await this.SeguroRepository.save(seguro)
	}

	async delete(id: number): Promise<DeleteResult> {
		if (!id) throw new HttpException("O id do seguro não foi informado!", HttpStatus.NOT_FOUND)

		await this.findById(id)

		return await this.SeguroRepository.delete(id)
	}
}

function calcularDesconto(seguro: Seguro): number {
	const anoAtual = new Date().getFullYear()
	const idadeCarro = anoAtual - seguro.anoFabricacao

	if (idadeCarro > 10) {
		return seguro.valorBase * 0.2
	} else {
		return 0
	}
}
