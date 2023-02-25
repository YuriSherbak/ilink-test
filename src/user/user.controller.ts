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
import { CreateUserInput, UpdateUserInput, UserEntity } from 'libs/domain';
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
  @Get()
  async users(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      relations: [
        'following',
        'following.following',
        'followedBy',
        'followedBy.follower',
        'userCommunities',
        'userCommunities.community',
      ],
    });
  }

  /**
   * Возвращает пользователя по его ID
   * @param id
   */
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
      relations: [
        'following',
        'following.following',
        'followedBy',
        'followedBy.follower',
        'userCommunities',
        'userCommunities.community',
      ],
    });
  }

  /**
   * Добавляет нового пользователя
   */
  @Post('/create')
  async createUser(@Body() input: CreateUserInput): Promise<UserEntity> {
    return await this.userService.createUser(input);
  }

  /**
   * Обновляет данные пользователя по ID
   */
  @Put('/update/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() input: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(id, input);
  }

  /**
   * Удаляет пользователя по его ID
   */
  @Delete('/delete/:id')
  async deleteUserById(@Param('id') id: string): Promise<string> {
    await this.userRepository.delete(id);
    return `Пользователь с ID ${id} был успешно удален.`;
  }
}
