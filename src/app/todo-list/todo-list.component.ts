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
  filter: 'all' | 'done' | 'todo' = 'all';
  editId: number | null = null;



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


  get filteredTodos() {
    const todos = this.todoService.todos();
    if (this.filter === 'done') return todos.filter(t => t.done);
    if (this.filter === 'todo') return todos.filter(t => !t.done);
    return todos;
  }

  add(label: string, deadline?: string) {
    this.todoService.add(label, deadline);
  }
  delete(todoId: number) {
    // Demande de confirmation (méthode simple JS)
    if (confirm('Supprimer cette tâche ?')) {
      this.todoService.delete(todoId);
    }
  }

  toggle(todo: any) {
    this.todoService.toggle(todo);
  }
}
