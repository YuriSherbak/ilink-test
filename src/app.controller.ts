import { Controller, Get } from '@nestjs/common';
import { baseRout } from './app.config';

@Controller(baseRout)
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello ! This is my test task for Ilink company !';
  }
}
