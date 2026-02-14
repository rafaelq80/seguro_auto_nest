import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, ILike } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      relations: {
        seguro: true,
      },
    });
  }

  async findById(id: number): Promise<Cliente> {
    let cliente = await this.clienteRepository.findOne({
      where: {
        id,
      },
      relations: {
        seguro: true,
      },
    });

    if (!cliente)
      throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);

    return cliente;
  }

  async findByNome(nome: string): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        seguro: true,
      },
    });
  }

  async create(Cliente: Cliente): Promise<Cliente> {
    return await this.clienteRepository.save(Cliente);
  }

  async update(cliente: Cliente): Promise<Cliente> {
    
    if (!cliente.id)
      throw new HttpException(
        'O id do cliente não foi informado!', 
        HttpStatus.NOT_FOUND,
      );

    await this.findById(cliente.id);

    return await this.clienteRepository.save(cliente);
  }

  async delete(id: number): Promise<DeleteResult> {
    
    if (!id)
      throw new HttpException(
        'O id do cliente não foi informado!', 
        HttpStatus.NOT_FOUND,
      );
    
    await this.findById(id);

    return await this.clienteRepository.delete(id);
  }
}
