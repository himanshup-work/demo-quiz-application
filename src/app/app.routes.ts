import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';

export const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'userHome', component: UserHomeComponent},
  {path: 'updateUser', component: UpdateUserComponent},
  {path: 'createQuiz', component: CreateQuizComponent}
];
