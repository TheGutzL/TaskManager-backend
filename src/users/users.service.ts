import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { OAuthUserDto } from './dto/create-oauth-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll() {
    return this.userRepository.find({ relations: ['roles'] });
  }

  async findById(id: number) {
    const userFound = await this.userRepository.findOne({ where: { id: id } });
    if (!userFound) throw new NotFoundException('Usuario no encontrado');
    return userFound;
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username: username },
      relations: ['roles'],
    });
  }

  async findOneByGithubId(githubId: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { githubId: githubId } });
  }

  async create(createUserDto: CreateUserDto | OAuthUserDto) {
    const { username, email, roles } = createUserDto;

    const existingUserByUsername = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUserByUsername)
      throw new ConflictException('El nombre de usuario ya está en uso');

    const existingUserByEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUserByEmail)
      throw new ConflictException('El email ya está en uso');

    const rolesEntites = await this.roleRepository.findBy({ name: In(roles) });

    if (rolesEntites.length === 0)
      throw new NotFoundException('Roles no encontrados');

    const userCreated = this.userRepository.create({
      ...createUserDto,
      roles: rolesEntites,
    });
    return await this.userRepository.save(userCreated);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { roles, ...userData } = updateUserDto;

    const roleEtnties = await this.roleRepository.findBy({ name: In(roles) });

    await this.userRepository.update(id, { ...userData, roles: roleEtnties });

    return this.userRepository.findOne({ where: { id }, relations: ['roles'] });
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  async updatePartial(id: number, updateUserDto: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({ where: { id: id } });
    if (!userFound) throw new NotFoundException('Usuario no encontrado');
    Object.assign(userFound, updateUserDto);
    return await this.userRepository.save(userFound);
  }
}
