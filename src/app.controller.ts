import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Log app name',
  })
  @ApiOkResponse({ type: String })
  @Get()
  logApp() {
    return 'Product';
  }
}
