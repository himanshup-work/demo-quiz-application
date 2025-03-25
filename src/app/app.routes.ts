import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'user-home', component: UserHomeComponent},
  {path: 'update-user', component: UpdateUserComponent},
  {path: 'create-quiz', component: CreateQuizComponent},
  {path: 'user-dashboard', component: UserDashboardComponent},
  {path: 'navbar', component: NavbarComponent},
];
