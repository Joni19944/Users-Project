import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Post } from '../types/posts';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  httpClient = inject(HttpClient);
  title = signal<String>('');
  body = signal<String>('');

  constructor() {}

  loadUsers() {
    return this.fetchUsers('https://jsonplaceholder.typicode.com/users');
  }
  loadPosts() {
    return this.fetchPosts('https://jsonplaceholder.typicode.com/posts');
  }

  fetchPosts(url: string) {
    return this.httpClient.get<Post[]>(url).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error('Somthing went wrong'));
      })
    );
  }
  fetchUsers(url: string) {
    return this.httpClient.get<User[]>(url).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error('Somthing went wrong'));
      })
    );
  }
}
