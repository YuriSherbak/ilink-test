import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CommunityEntity,
  CreateCommunityInput,
  UpdateCommunityInput,
} from 'libs/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityService } from './community.service';

@Resolver(() => CommunityEntity)
export class CommunityResolver {
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly communityRepository: Repository<CommunityEntity>,
    private readonly communityService: CommunityService,
  ) {}

  /**
   * Возвращает все сообщества
   */
  @Query(() => [CommunityEntity], { description: 'Возвращает все сообщества' })
  async communities(): Promise<CommunityEntity[]> {
    return await this.communityRepository.find({
      relations: ['userCommunities', 'userCommunities.user'],
    });
  }

  /**
   * Возвращает сообщество по его ID
   */
  @Query(() => CommunityEntity, { description: 'Возвращает сообщество по ID' })
  async getCommunityById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CommunityEntity> {
    return await this.communityRepository.findOne({
      relations: ['userCommunities', 'userCommunities.user'],
    });
  }

  /**
   * Создает новое сообщество
   */
  @Mutation(() => CommunityEntity, { description: 'Создает новое сообщество' })
  async createCommunity(
    @Args('input', { type: () => CreateCommunityInput })
    input: CreateCommunityInput,
  ): Promise<CommunityEntity> {
    return await this.communityService.createCommunity(input);
  }

  /**
   * Обновляет данные о сообществе по его ID
   */
  @Mutation(() => CommunityEntity, {
    description: 'Обновляет данные о сообществе по его ID',
  })
  async updateCommunityById(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => UpdateCommunityInput })
    input: UpdateCommunityInput,
  ): Promise<CommunityEntity> {
    return await this.communityService.updateCommunity(id, input);
  }

  /**
   * Удаляет сообщество по его ID
   * @param id
   */
  @Mutation(() => String, { description: 'Удаляет сообщество по его ID' })
  async deleteCommunityById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<string> {
    await this.communityRepository.delete(id);
    return `Сообщество ${id} было успешно удалено.`;
  }
}
