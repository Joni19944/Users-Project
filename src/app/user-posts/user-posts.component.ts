import { FetchBackend } from '@angular/common/http';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { Post } from '../types/posts';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css',
})
export class UserPostsComponent implements OnInit {
  fetchService = inject(FetchService);
  userId = input();
  userName = input();
  userPosts = signal<Post[]>([]);
  ngOnInit() {
    this.fetchService.loadPosts().subscribe({
      next: (val) => {
        const filtered = val.filter((el: Post) => el.userId == this.userId());
        this.userPosts.set(filtered);
      },
    });
  }
  onContentToService(title: string, body: string) {
    this.fetchService.title.set(title);
    this.fetchService.body.set(body);
  }
}
