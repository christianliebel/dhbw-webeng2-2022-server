import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from 'src/todo/todo';

@Controller('todos')
export class TodosController {
  @Get()
  getAllTodos(): Todo[] {
    return [
      {
        id: 1,
        name: 'Wäsche waschen',
        done: false,
      },
    ];
  }

  @Get(':id')
  getSingleTodo(@Param('id') id: string): Todo {
    return this.getAllTodos()[0];
    // throw new NotFoundError();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createNewTodo(@Body() body: Todo): Todo {
    return { ...body, id: 2 };
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateTodo(@Param('id') id: string, @Body() body: Todo): void {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTodo(@Param('id') id: string): void {}
}
