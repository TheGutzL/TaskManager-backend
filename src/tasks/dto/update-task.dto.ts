import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../entities/task.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDate?: Date;

  @IsInt()
  @IsOptional()
  assignedTo?: number;

  @IsEnum(TaskStatus)
  @IsOptional() 
  status?: string;
}
