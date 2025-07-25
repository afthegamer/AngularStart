import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Todo {
  id: number;
  label: string;
  done: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],   // fichier vide accepté
})
export class TodoListComponent {
  private nextId = 1;
  todos = signal<Todo[]>([]);

  add(label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;
    this.todos.update(list => [
      ...list,
      { id: this.nextId++, label: trimmed, done: false },
    ]);
  }

  toggle(todo: Todo) {
    this.todos.update(list =>
      list.map(t => (t.id === todo.id ? { ...t, done: !t.done } : t)),
    );
  }

  remaining = computed(() => this.todos().filter(t => !t.done).length);
}
