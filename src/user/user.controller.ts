import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { baseRout } from '../app.config';
import { CreateUserInput, UserEntity } from 'libs/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Repository } from 'typeorm';

@Controller(`${baseRout}/users`)
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Возвращает всех пользователей
   */
  @Get('/all')
  async users(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  /**
   * Возвращает пользователя по его ID
   * @param id
   */
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  /**
   * Добавляет нового пользователя
   */
  @Post('/add')
  async createUser(@Body() input: CreateUserInput): Promise<UserEntity> {
    return await this.userService.createUser(input);
  }

  /**
   * Обновляет данные пользователя по ID
   */
  @Put('/update/:id')
  async updateUserById(@Param('id') id: string /*body8*/): Promise<void> {}

  /**
   * Удаляет пользователя по его ID
   */
  @Delete('/delete/:id')
  async deleteUserById(@Param('id') id: string): Promise<void> {}

  /**
   * Удаляет всех пользователей
   */
  @Delete('/delete/all')
  async deleteUsers(): Promise<void> {}
}
