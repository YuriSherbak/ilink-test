import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserInput,
  UserEntity,
  CommunityEntity,
  UserCommunityEntity,
  FollowEntity,
} from 'libs/domain';

import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CommunityEntity)
    private readonly communityRepository: Repository<CommunityEntity>,
    @InjectRepository(UserCommunityEntity)
    private readonly userCommunityRepository: Repository<UserCommunityEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  /**
   * Возвращает всех пользователей
   */
  async users(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  /**
   * Возвращает пользователя по его ID
   * @param id
   */
  async getUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  /**
   * Создает нового пользователя. Находит и возвращает созданного пользователя из базы
   * @param userInput - данные для создания пользователя
   */
  async createUser(userInput: CreateUserInput): Promise<UserEntity> {
    const user = new UserEntity();
    user.nickname = userInput.nickname;
    user.followedBy = [];
    user.following = [];
    user.userCommunities = [];
    await this.userRepository.save(user);
    if (userInput?.followingIds) {
      for (const followingUserId of userInput.followingIds) {
        await this.followUser(user.id, followingUserId);
      }
    }
    if (userInput.followerIds) {
      for (const followerUserId of userInput.followerIds) {
        await this.followUser(followerUserId, user.id);
      }
    }
    for (const communityId of userInput.communityIds) {
      await this.joinCommunity(user.id, communityId);
    }
    return await this.userRepository.findOne({ where: { id: user.id } });
  }

  /**
   * Подписывает одного пользователя на другого, создавая связь между ними
   * @param followerId - ID пользователя-подписчика
   * @param followingId - ID пользователя, на которого подписались
   */
  async followUser(followerId: string, followingId: string): Promise<void> {
    const follower = await this.userRepository.findOne({
      where: { id: followerId },
    });
    if (!follower)
      throw new Error(
        `Невозомжно подписать пользователя: Пользователь с ID: ${followerId} не найден`,
      );
    const following = await this.userRepository.findOne({
      where: { id: followingId },
    });
    if (!following)
      throw new Error(
        `Невозможно подписаться на пользователя: Пользователь с ID: ${followingId} не найден`,
      );
    const follow = new FollowEntity();
    follow.followerId = followerId;
    follow.followingId = followingId;
    await this.followRepository.save(follow);
  }

  /**
   * Создает связь между пользователем и сообществом, в которое он вступил
   * @param userId - ID пользователя
   * @param communityId - ID сообщества
   */
  async joinCommunity(userId: string, communityId: string): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    if (!user)
      throw new Error(
        `Невозможно вступить в сообщество: Пользователь с ID ${userId} не найден.`,
      );
    const community = await this.communityRepository.findOne(communityId);
    if (!community)
      throw new Error(
        `Невозможно вступить в сообщество: Сообщество с ID ${communityId} не найдено.`,
      );
    const userCommunity = new UserCommunityEntity();
    userCommunity.communityId = communityId;
    userCommunity.userId = userId;
    await this.userCommunityRepository.save(userCommunity);
  }
}
