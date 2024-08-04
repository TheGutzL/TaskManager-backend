import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationsController } from 'src/notifications/notifications.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  controllers: [TasksController, NotificationsController],
  providers: [TasksService, NotificationsService],
  exports: [TasksService],
})
export class TasksModule {}
