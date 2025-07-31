import { Injectable, signal, computed } from '@angular/core';

export interface Todo {
  id: number;
  label: string;
  done: boolean;
  createdAt: Date;
  deadline?: Date;
  archived?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private nextId = 1;
  todos = signal<Todo[]>([]);

  add(label: string, deadline?: string) {
    const trimmed = label.trim();
    if (!trimmed) return;
    this.todos.update(list => [
      ...list,
      {
        id: this.nextId++,
        label: trimmed,
        done: false,
        createdAt: new Date(),
        deadline: deadline ? new Date(deadline) : undefined
      },
    ]);
    this.save();
  }
  // Supprimer définitivement UNE archive
  deleteArchived(id: number) {
    this.todos.update(list => list.filter(t => !(t.id === id && t.archived)));
    this.save();
  }

// Désarchiver UNE tâche
  unarchive(id: number) {
    this.todos.update(list => list.map(t =>
      t.id === id ? { ...t, archived: false, done: false } : t
    ));
    this.save();
  }

// Supprimer toutes les archives
  deleteAllArchived() {
    this.todos.update(list => list.filter(t => !t.archived));
    this.save();
  }

  archiveDone() {
    this.todos.update(list =>
      list.map(t => t.done ? { ...t, archived: true } : t)
    );
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
  delete(id: number) {
    this.todos.update(list => list.filter(t => t.id !== id));
    this.save();
  }


  load() {
    const data = localStorage.getItem('todos');
    if (data) {
      const parsed = JSON.parse(data);
      this.todos.set(parsed.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt),
        deadline: t.deadline ? new Date(t.deadline) : undefined
      })));
      if (parsed.length) {
        this.nextId = Math.max(...parsed.map((t: any) => t.id)) + 1;
      }
    }
  }
  edit(todoId: number, newLabel: string, newDeadline?: string) {
    this.todos.update(list =>
      list.map(t =>
        t.id === todoId
          ? {
            ...t,
            label: newLabel.trim() || t.label,
            deadline: newDeadline ? new Date(newDeadline) : undefined
          }
          : t
      )
    );
    this.save();
  }

  constructor() {
    this.load();
  }
}
