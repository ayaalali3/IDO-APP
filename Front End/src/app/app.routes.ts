import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
  { path: '', component: SigninComponent },
  {path: 'signin', component: SigninComponent},
  {path: 'todo', component: TodoComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}