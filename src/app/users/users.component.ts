import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { RouterLink } from '@angular/router';
import { User } from '../types/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  fetchService = inject(FetchService);
  users = signal<User[]>([]);
  ngOnInit(): void {
    this.fetchService
      .loadUsers()
      .subscribe({ next: (val) => this.users.set(val) });
  }
}
