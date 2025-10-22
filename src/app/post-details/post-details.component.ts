import { Component, inject, signal } from '@angular/core';
import { FetchService } from '../services/fetch.service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent {
  fetchService = inject(FetchService);
  title = signal<String>('');
  body = signal<String>('');
  ngOnInit() {
    this.title.set(this.fetchService.title());
    this.body.set(this.fetchService.body());
  }
}
