import { Controller, Get, Options, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

import { ActionHeaderInterceptor } from './interceptors/action-header/action-header.interceptor';
import { ConfigService } from '@nestjs/config';

@Controller()
@UseInterceptors(ActionHeaderInterceptor)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get('actions.json')
  getActions() {
    return this.appService.getRules();
  }

  @Options('*')
  fakeOptions(): string {
    return this.appService.getHello();
  }
  @Get()
  get(): string {
    return this.configService.get<string>('BASE_URL');
  }
}
