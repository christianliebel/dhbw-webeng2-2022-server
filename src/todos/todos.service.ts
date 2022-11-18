import { Injectable } from '@nestjs/common';
import { Todo } from '../todo/todo';

@Injectable()
export class TodosService {
  private readonly store = new Map<number, Todo>();
  private nextId = 1;

  getAll(): Todo[] {
    return Array.from(this.store.values());
  }

  get(id: number): Todo | undefined {
    return this.store.get(id);
  }

  add(name: string): Todo {
    const todo: Todo = { name, done: false, id: this.nextId++ };
    this.store.set(todo.id, todo);
    return todo;
  }

  update(id: number, todo: Todo): void {
    this.store.set(id, { id, name: todo.name, done: todo.done });
  }

  delete(id: number): void {
    this.store.delete(id);
  }
}
