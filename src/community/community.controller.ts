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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityEntity } from 'libs/domain';
import { CreateCommunityInput, UpdateCommunityInput } from 'libs/domain';
import { CommunityService } from './community.service';

@Controller(`${baseRout}/communities`)
export class CommunityController {
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly communityRepository: Repository<CommunityEntity>,
    private readonly communityService: CommunityService,
  ) {}

  /**
   * Возвращает все сообщества
   */
  @Get('/all')
  async communities(): Promise<CommunityEntity[]> {
    return await this.communityRepository.find();
  }

  /**
   * Возвращает сообщество по его ID
   */
  @Get('/:id')
  async getCommunityById(@Param('id') id: string): Promise<CommunityEntity> {
    return await this.communityRepository.findOne({ where: { id } });
  }

  /**
   * Создает новое сообщество
   */
  @Post('/create')
  async createCommunity(
    @Body() input: CreateCommunityInput,
  ): Promise<CommunityEntity> {
    return await this.communityService.createCommunity(input);
  }

  /**
   * Обновляет данные о сообществе по его ID
   */
  @Put('/update/:id')
  async updateCommunityById(
    @Param('id') id: string,
    @Body() input: UpdateCommunityInput,
  ): Promise<CommunityEntity> {
    return await this.communityService.updateCommunity(id, input);
  }

  /**
   * Удаляет сообщество по его ID
   * @param id
   */
  @Delete('/delete/:id')
  async deleteCommunityById(@Param('id') id: string): Promise<string> {
    await this.communityRepository.delete(id);
    return `Сообщество ${id} было успешно удалено.`;
  }
}
