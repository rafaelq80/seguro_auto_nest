import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SeguroController } from "./controllers/seguro.controller"
import { Seguro } from "./entities/seguro.entity"
import { SeguroService } from "./services/seguro.service"
import { ClienteModule } from "../cliente/cliente.module"

@Module({
	imports: [TypeOrmModule.forFeature([Seguro]), ClienteModule],
	providers: [SeguroService],
	controllers: [SeguroController],
	exports: [TypeOrmModule, SeguroService],
})
export class SeguroModule {}
