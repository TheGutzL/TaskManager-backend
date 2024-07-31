import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
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

  async create(role: CreateRoleDto) {
    return this.rolesRepostiroy.save(role);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.rolesRepostiroy.update(id, updateRoleDto);
    return this.rolesRepostiroy.findOne({ where: { id: id } });
  }

  async remove(id: number) {
    return await this.rolesRepostiroy.delete(id);
  }
}
