import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IApiResponse, IUserRegistration } from '../../model/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userObj: IUserRegistration = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    image: ''
  };

  private httpClient = inject(HttpClient);
  private router = inject(Router);
  
  cover: string | null = null;
  coverFile: File | null = null;
  showError = false;
  showPassword = false;
  isLoading = false;

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file) {
      this.coverFile = file;
      const reader = new FileReader();
      
      reader.onload = () => {
        const dataUrl = reader.result as string;
        this.userObj.image = dataUrl.split(',')[1];
        this.cover = dataUrl;
      };
      
      reader.readAsDataURL(file);
      this.showError = false;
    }
  }

  onSubmit(form: NgForm): void {
    console.log(this.userObj.image);
    if (form.invalid) {
      form.control.markAllAsTouched();
      if (!this.cover) {
        this.showError = true;
      }
      return;
    }

    if (this.userObj.password !== this.userObj.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.isLoading = true;
    const url = 'http://localhost:8080/user/create';

    this.httpClient.post<IApiResponse>(url, this.userObj)
      .subscribe({
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
        }
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}