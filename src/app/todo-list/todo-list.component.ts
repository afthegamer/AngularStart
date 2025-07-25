import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';// Ancienne syntaxe
import {CapitalizePipe} from '../shared/capitalize-pipe';


interface Todo {
  id: number;
  label: string;
  done: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, CapitalizePipe], // Ancienne syntaxe
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  today = new Date();
  private nextId = 1;
  todos = signal<Todo[]>([]);

  add(label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;
    this.todos.update(list => [
      ...list,
      { id: this.nextId++, label: trimmed, done: false, createdAt: new Date() },
    ]);
  }

  toggle(todo: Todo) {
    this.todos.update(list =>
      list.map(t => (t.id === todo.id ? { ...t, done: !t.done } : t)),
    );
  }

  remaining = computed(() => this.todos().filter(t => !t.done).length);
}
