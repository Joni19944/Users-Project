import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { RouterLink } from '@angular/router';
import { User } from '../types/user';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  fetchService = inject(FetchService);
  users = signal<User[]>([]);
  searchTerm = signal('');

  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.users().filter((user) => {
      const [name, surname] = user.name.split(' ');
      return (
        name.toLowerCase().includes(term) ||
        (surname && surname.toLowerCase().includes(term)) ||
        user.email.toLowerCase().includes(term)
      );
    });
  });
  ngOnInit(): void {
    this.fetchService
      .loadUsers()
      .subscribe({ next: (val) => this.users.set(val) });
  }
  updateSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm.set(value);
  }
}
