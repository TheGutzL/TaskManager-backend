import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepostiroy: Repository<Role>,
  ) {}

  async findAll() {
    return this.rolesRepostiroy.find();
  }

  async findOne(id: number) {
    return this.rolesRepostiroy.findOne({ where: { id } });
  }

  async create(role: Role) {
    return this.rolesRepostiroy.save(role);
  }

  async update(id: number, role: Role) {
    await this.rolesRepostiroy.update(id, role);
    return this.rolesRepostiroy.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.rolesRepostiroy.delete(id);
  }
}
