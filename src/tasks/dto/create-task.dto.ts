import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @IsInt()
  @IsNotEmpty()
  assignedTo: number;
}
