import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'users/:userId/:userName', component: UserPostsComponent },
  { path: 'posts/:id', component: PostDetailsComponent },
  { path: 'userTodo/:userId/:userName', component: TodoComponent },
];
