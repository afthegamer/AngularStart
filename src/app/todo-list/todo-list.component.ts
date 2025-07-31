import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../shared/capitalize-pipe';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';
import { HighlightPipe } from '../highlight-pipe';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CapitalizePipe, HighlightPipe],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  today = new Date();
  filter: 'all' | 'done' | 'todo' = 'all';
  editId: number | null = null;
  searchTerm: string = '';
  sort: 'none' | 'date' | 'alpha' = 'none';
  showArchives = false;

  // --- Confirmation d'action (modale personnalisée) ---
  confirmation: {
    action: 'deleteOne' | 'deleteAll' | 'deleteOneActive' | null,
    taskId?: number
  } = { action: null };

  openConfirmation(action: 'deleteOne' | 'deleteAll' | 'deleteOneActive', taskId?: number) {
    this.confirmation = { action, taskId };
  }
  closeConfirmation() {
    this.confirmation = { action: null };
  }
  validateConfirmation() {
    if (this.confirmation.action === 'deleteOne' && this.confirmation.taskId) {
      this.todoService.deleteArchived(this.confirmation.taskId);
    }
    if (this.confirmation.action === 'deleteOneActive' && this.confirmation.taskId) {
      this.todoService.delete(this.confirmation.taskId);
    }
    if (this.confirmation.action === 'deleteAll') {
      this.todoService.deleteAllArchived();
    }
    this.closeConfirmation();
  }
  // ------------------------------------------------------

  get hasTodos() {
    return this.todoService.todos().some(t => !t.archived);
  }
  get hasDoneNotArchived() {
    return this.todoService.todos().some(t => t.done && !t.archived);
  }
  get archivedCount() {
    return this.todoService.todos().filter(t => t.archived).length;
  }
  get archivedTodos() {
    return this.todoService.todos().filter(t => t.archived);
  }

  unarchive(id: number) {
    this.todoService.unarchive(id);
  }

  constructor(public todoService: TodoService) {}
  startEdit(todoId: number) {
    this.editId = todoId;
  }
  endEdit() {
    this.editId = null;
  }
  saveEdit(todo: any, input: HTMLInputElement, dateInput: HTMLInputElement) {
    const value = input.value.trim();
    const dateValue = dateInput.value;
    if (value) {
      this.todoService.edit(todo.id, value, dateValue);
    }
    this.endEdit();
  }
  archiveDone() {
    this.todoService.archiveDone();
  }

  get filteredTodos() {
    let todos = this.todoService.todos().filter(t => !t.archived);

    // Filtres existants
    if (this.filter === 'done') todos = todos.filter(t => t.done);
    if (this.filter === 'todo') todos = todos.filter(t => !t.done);

    // Filtre recherche
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.trim().toLowerCase();
      todos = todos.filter(t => t.label.toLowerCase().includes(term));
    }

    // Tri
    if (this.sort === 'date') {
      return [...todos].sort((a, b) => {
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return a.deadline.getTime() - b.deadline.getTime();
      });
    }
    if (this.sort === 'alpha') {
      return [...todos].sort((a, b) =>
        a.label.localeCompare(b.label, 'fr', { sensitivity: 'base' })
      );
    }
    // Sinon : retourne le tableau sans tri (ordre création)
    return todos;
  }

  add(label: string, deadline?: string) {
    this.todoService.add(label, deadline);
  }

  toggle(todo: any) {
    this.todoService.toggle(todo);
  }
}
