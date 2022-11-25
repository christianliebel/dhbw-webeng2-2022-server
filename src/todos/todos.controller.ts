import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Todo } from 'src/todo/todo';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  private readonly logger = new Logger('TodosController');

  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAllTodos(@Req() req: Request): Todo[] {
    this.logger.log('Todos were requested.');
    this.logger.log(req['auth'].sub);
    return this.todosService.getAll();
  }

  @Get(':id')
  getSingleTodo(@Param('id') id: string): Todo {
    const todo = this.todosService.get(+id);
    if (todo) {
      return todo;
    } else {
      throw new NotFoundException();
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createNewTodo(@Body() body: Todo): Todo {
    return this.todosService.add(body.name);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateTodo(@Param('id') id: string, @Body() body: Todo): void {
    this.todosService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTodo(@Param('id') id: string): void {
    this.todosService.delete(+id);
  }
}
