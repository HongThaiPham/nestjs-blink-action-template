import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Options,
  Param,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionHeaderInterceptor } from 'src/interceptors/action-header/action-header.interceptor';
import { Response } from 'express';

@Controller('actions')
@UseInterceptors(ActionHeaderInterceptor)
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Get('transfer-sol/:destination')
  getTransferSol(
    @Res() res: Response,
    @Param('destination') destination: string,
  ) {
    try {
      return this.actionsService.getTransferSol(destination);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }

  @Post('transfer-sol/:destination')
  postTransferSol(
    @Res() res: Response,
    @Param('destination') destination: string,
    @Query('amount') amount: number,
    @Body('account') account: string,
  ) {
    try {
      return this.actionsService.postTransferSol(account, destination, amount);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }

  @Options('*')
  optionsTransferSol(): string {
    return 'ok';
  }
}
