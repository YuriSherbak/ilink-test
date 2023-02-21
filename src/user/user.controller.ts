import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { baseRout } from '../app.config';
import { UserEntity } from 'libs/domain/entities/user.entity';

@Controller(`${baseRout}/users`)
export class UserController {
  constructor() {}

  /**
   * Возвращает всех пользователей
   */
  @Get('/all')
  async users(): Promise<void> {}

  /**
   * Возвращает пользователя по его ID
   * @param id
   */
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<void> {}

  /**
   * Добавляет нового пользователя
   */
  @Post('/add')
  async createUser(/*body*/): Promise<void> {}

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
