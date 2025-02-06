// register.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { IUserRegistration } from '../../model/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  registerForm: FormGroup;
  cover: string | null = null;
  coverFile: File | null = null;
  showError = false;
  showPassword = false;
  isLoading = false;

  constructor() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        image: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  private passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      this.coverFile = file;
      const reader = new FileReader();

      reader.onload = () => {
        const dataUrl = reader.result as string;
        this.registerForm.patchValue({
          image: dataUrl.split(',')[1],
        });
        this.cover = dataUrl;
      };

      reader.readAsDataURL(file);
      this.showError = false;
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) return `${controlName} is required`;
      if (control.errors['minlength'])
        return `${controlName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['maxlength'])
        return `${controlName} cannot exceed ${control.errors['maxlength'].requiredLength} characters`;
      if (control.errors['email']) return 'Please enter a valid email address';
      if (control.errors['pattern'])
        return 'Password must include uppercase, lowercase, number, and special character';
    }
    return '';
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach((key) => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });

      if (!this.cover) {
        this.showError = true;
      }
      return;
    }

    if (this.registerForm.hasError('mismatch')) {
      alert('Passwords do not match');
      return;
    }

    this.isLoading = true;

    const formData: IUserRegistration = {
      userId: '',
      ...this.registerForm.value,
    };

    this.authService.signup(formData).subscribe({
      next: (response) => {
        if (response.status) {
          alert(response.message);
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
