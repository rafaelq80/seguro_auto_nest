import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Put,
	UseGuards,
} from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard"
import { Seguro } from "../entities/seguro.entity"
import { SeguroService } from "../services/seguro.service"

@UseGuards(JwtAuthGuard)
@Controller("/Seguros")
@ApiTags("Seguro")
@ApiBearerAuth()
export class SeguroController {
	constructor(private readonly SeguroService: SeguroService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	findAll(): Promise<Seguro[]> {
		return this.SeguroService.findAll()
	}

	@Get("/:id")
	@HttpCode(HttpStatus.OK)
	findById(@Param("id", ParseIntPipe) id: number): Promise<Seguro> {
		return this.SeguroService.findById(id)
	}

	@Get("/modelo/:modelo")
	@HttpCode(HttpStatus.OK)
	findByModelo(@Param("modelo") modelo: string): Promise<Seguro[]> {
		return this.SeguroService.findByModelo(modelo)
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() Seguro: Seguro): Promise<Seguro> {
		return this.SeguroService.create(Seguro)
	}

	@Put()
	@HttpCode(HttpStatus.OK)
	async update(@Body() Seguro: Seguro): Promise<Seguro> {
		return this.SeguroService.update(Seguro)
	}

	@Delete("/:id")
	@HttpCode(HttpStatus.NO_CONTENT)
	delete(@Param("id", ParseIntPipe) id: number) {
		return this.SeguroService.delete(id)
	}
}
