import { ConflictException, Controller, Get, Param, Post } from "@nestjs/common";
import { AppService } from './app.service';

@Controller('greet')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  getHello(@Param('name') name): string {
    return `Hello ${name}!`;
  }

  @Post(':name')
  postHello(@Param('name') name): string {
    throw new ConflictException();
  }
}
