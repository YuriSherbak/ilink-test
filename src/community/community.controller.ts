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

@Controller(`${baseRout}/communities`)
export class CommunityController {
  constructor() {}

  /**
   * Возвращает все сообщества
   */
  @Get('/all')
  async communities(): Promise<void> {}

  /**
   * Возвращает сообщество по его ID
   */
  @Get('/:id')
  async getCommunityById(@Param('id') id: string): Promise<void> {}

  /**
   * Создает новое сообщество
   */
  @Post('/create')
  async createCommunity(/* body*/): Promise<void> {}

  /**
   * Обновляет данные о сообществе по его ID
   */
  @Put('/update/:id')
  async updateCommunityById(@Param('id') id: string /*body*/): Promise<void> {}

  /**
   * Удаляет сообщество по его ID
   * @param id
   */
  @Delete('/delete/:id')
  async deleteCommunityById(@Param('id') id: string): Promise<void> {}

  /**
   * Удаляет все сообщества
   */
  @Delete('delete/all')
  async deleteAll(): Promise<void> {}
}
