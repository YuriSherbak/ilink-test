import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput, UserEntity } from 'libs/domain';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Возвращает всех пользователей
   */
  @Query(() => [UserEntity], { description: 'Возвращает всех пользователей' })
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
  @Query(() => UserEntity, { description: 'Возвращает пользователя по ID' })
  async getUserById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<UserEntity> {
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
   * Создает нового пользователя
   * @param input - данные для создания нового пользователя
   */
  @Mutation(() => UserEntity, { description: 'Создает нового пользователя' })
  async createUser(
    @Args('input', { type: () => CreateUserInput }) input: CreateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.createUser(input);
  }

  /**
   * Обновляет данные существуюшего пользователя по ID
   * @param id
   * @param input - данные для обновления инорфмации пользователя
   */
  @Mutation(() => UserEntity, {
    description: 'Обновляет данные существующего пользователя',
  })
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => UpdateUserInput }) input: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(id, input);
  }

  /**
   * Удаляет пользователя по его ID
   * @param id
   */
  @Mutation(() => String, { description: 'Удаляет пользователя по его ID' })
  async deleteUser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<string> {
    await this.userRepository.delete(id);
    return `Пользователь с ID ${id} был успешно удален`;
  }
}
