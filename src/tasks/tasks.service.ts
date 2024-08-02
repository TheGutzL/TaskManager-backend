import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.taskRepository.find({ relations: ['assignedTo'] });
  }

  async findOneById(id: number) {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async create(createTaskDto: CreateTaskDto) {
    const userFound = await this.userRepository.findOne({
      where: { id: createTaskDto.assignedTo },
    });
    if (!userFound) throw new Error('Usuario no encontrado');

    const task = this.taskRepository.create({
      ...createTaskDto,
      assignedTo: userFound,
    });

    return await this.taskRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskFound = await this.taskRepository.findOne({ where: { id } });
    if (!taskFound) throw new NotFoundException('Tarea no encontrada');

    if (updateTaskDto.assignedTo) {
      const userFound = await this.userRepository.findOne({
        where: { id: updateTaskDto.assignedTo },
      });
      if (!userFound) throw new NotFoundException('Usuario no encontrado');
    }

    const updateTask = Object.assign(taskFound, updateTaskDto);
    return await this.taskRepository.save(updateTask);
  }

  async delete(id: number) {
    return this.taskRepository.delete(id);
  }
}
