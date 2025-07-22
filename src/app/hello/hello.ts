import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hello',
  standalone: true,
  templateUrl: './hello.html',
  styleUrls: ['./hello.css'],
})
export class HelloComponent {
  greeting = signal('Bonjour Angular 20 🎉');
}
