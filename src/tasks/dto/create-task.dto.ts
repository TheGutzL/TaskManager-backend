import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the task' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The due date of the task' })
  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @ApiProperty({ description: 'The user ID of the person assigned' })
  @IsInt()
  @IsNotEmpty()
  assignedTo: number;
}
