import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    // {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'register', component: RegisterComponent}
];
