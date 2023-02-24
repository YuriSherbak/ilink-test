import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from 'libs/domain';
import { Repository } from 'typeorm';
import { CreateCommunityInput, UpdateCommunityInput } from 'libs/domain';

import { v4 as uuid } from 'uuid';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly communityRepository: Repository<CommunityEntity>,
  ) {}

  /**
   * Создает новое сообщество
   * @param input - данные для создания сообщества
   */
  async createCommunity(input: CreateCommunityInput): Promise<CommunityEntity> {
    const community = new CommunityEntity();
    community.id = uuid();
    community.name = input.name;
    community.thematic = input.thematic;
    await this.communityRepository.save(community);
    return await this.communityRepository.findOne({
      where: { id: community.id },
    });
  }

  /**
   * Обновляет существующее сообщество
   * @param userId - ID сообщества
   * @param input - данные для обновления сообщества
   */
  async updateCommunity(
    userId: string,
    input: UpdateCommunityInput,
  ): Promise<CommunityEntity> {
    const community = await this.communityRepository.findOne({
      where: { id: userId },
    });
    community.name = input.name;
    community.thematic = input.thematic;
    await this.communityRepository.save(community);
    return await this.communityRepository.findOne({
      where: { id: community.id },
    });
  }
}
