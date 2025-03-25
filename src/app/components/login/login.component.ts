import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { IAuthRequest } from '../../model/auth.model';
import { StorageService } from '../../services/storage/storage.service';
import { ILoggedInUser } from '../../model/user.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  showPassword = false;
  isLoading = false;
  loginError = '';

  userForm: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  // Getter methods for easy form access in template
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getErrorMessage(field: string): string {
    const control = this.userForm.get(field);
    if (control?.errors) {
      if (control.errors['required']) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
      if (control.errors['email'] || control.errors['pattern']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        return 'Password must be at least 8 characters long';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.loginError = '';

    const authRequest: IAuthRequest = {
      ...this.userForm.value
    };

    this.authService.login(authRequest).subscribe({
      next: (response: any) => {
        if (response.status) {
          StorageService.saveToken(response.data.token);
          const user: ILoggedInUser = {
            userId: response.data.userId,
            userRole: response.data.userRole
          };
          StorageService.saveLoggedInUser(user);
          if(user.userRole.includes('ADMIN')){
            this.router.navigate(['/learderboard']);
          }else if (user.userRole === 'USER'){
            this.router.navigate(['/user-dashboard']);
          }
          
        } else {
          this.loginError = 'Invalid credentials';
        }
      },
      error: (error) => {
        this.loginError = 'An error occurred during login. Please try again.';
        // console.error('Login error:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}