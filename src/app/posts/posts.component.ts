import { Component, inject, signal } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { Post } from '../types/posts';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  fetchService = inject(FetchService);
  posts = signal<(Post & { userName?: string })[]>([]);

  ngOnInit(): void {
    combineLatest([
      this.fetchService.loadUsers(),
      this.fetchService.loadPosts(),
    ])
      .pipe(
        map(([users, posts]) =>
          posts.map((post) => {
            const matchedUser = users.find((u) => u.id === post.userId);
            return {
              ...post,
              userName: matchedUser ? matchedUser.name : 'უცნობი მომხმარებელი',
            };
          })
        )
      )
      .subscribe({
        next: (combinedPosts) => this.posts.set(combinedPosts),
      });
  }
}
