import { Component, inject, input, signal } from '@angular/core';
import { Todo } from '../types/user';
import { FetchService } from '../services/fetch.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgClass],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  fetchService = inject(FetchService);
  userId = input('');
  userName = input();
  userTodo = signal<Todo[]>([]);
  ngOnInit() {
    this.fetchService.loadTodo(this.userId()).subscribe({
      next: (val) => {
        this.userTodo.set(val);
      },
    });
  }
}
