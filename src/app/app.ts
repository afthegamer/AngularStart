// src/app/app.ts
import { Component, signal } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TodoListComponent} from './todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [
    RouterOutlet,
    TodoListComponent
  ],
  // ← pluriel recommandé
})
export class App {
  protected readonly greeting = signal('Bonjour Angular 20 🎉');
}
