import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { Post } from '../types/posts';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  fetchService = inject(FetchService);
  posts = signal<Post[]>([]);
  ngOnInit(): void {
    this.fetchService
      .loadPosts()
      .subscribe({ next: (val) => this.posts.set(val) });
  }
}
