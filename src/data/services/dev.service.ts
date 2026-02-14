import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Cliente } from "../../cliente/entities/cliente.entity";
import { Seguro } from "../../seguro/entities/seguro.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_seguro_auto',
            entities: [Cliente, Seguro, Usuario],
            synchronize: true,
    };
  }
}