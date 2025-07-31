import { Injectable, signal, computed } from '@angular/core';

export interface Todo {
  id: number;
  label: string;
  done: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private nextId = 1;
  todos = signal<Todo[]>([]);

  add(label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;
    this.todos.update(list => [
      ...list,
      { id: this.nextId++, label: trimmed, done: false, createdAt: new Date() },
    ]);
    this.save();
  }

  toggle(todo: Todo) {
    this.todos.update(list =>
      list.map(t => (t.id === todo.id ? { ...t, done: !t.done } : t))
    );
    this.save();
  }

  remaining = computed(() => this.todos().filter(t => !t.done).length);

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos()));
  }
  delete(todoId: number) {
    this.todos.update(list => list.filter(t => t.id !== todoId));
    this.save();
  }


  load() {
    const data = localStorage.getItem('todos');
    if (data) {
      const parsed = JSON.parse(data);
      this.todos.set(parsed.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt)
      })));
      if (parsed.length) {
        this.nextId = Math.max(...parsed.map((t: any) => t.id)) + 1;
      }
    }
  }
  edit(todoId: number, newLabel: string) {
    this.todos.update(list =>
      list.map(t =>
        t.id === todoId
          ? { ...t, label: newLabel.trim() || t.label }
          : t
      )
    );
    this.save();
  }

  constructor() {
    this.load();
  }
}
