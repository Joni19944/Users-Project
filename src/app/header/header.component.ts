import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  today = signal<Date>(new Date());
  private timerId!: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.timerId = setInterval(() => {
      this.today.set(new Date());
    }, 30000);

    this.today.set(new Date());
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }
}
