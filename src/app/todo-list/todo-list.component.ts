import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../shared/capitalize-pipe'; // ton chemin exact
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  today = new Date();

  constructor(public todoService: TodoService) {}

  add(label: string) {
    this.todoService.add(label);
  }

  toggle(todo: any) {
    this.todoService.toggle(todo);
  }
}
