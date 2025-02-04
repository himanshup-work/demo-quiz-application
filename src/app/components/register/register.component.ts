import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userObj: any = {
    userId: '',
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    image: '',
  };

  httpClient = inject(HttpClient);
  model: any = {};
  cover!: string;
  cover_file: any;
  showError = false;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cover_file = file;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        this.userObj.image = dataUrl.split(',')[1]; // Remove the metadata part of the Base64 string
        this.cover = dataUrl; // For preview purposes
      };
      reader.readAsDataURL(file);
      this.showError = false;
    }
  }

  retrievedUser: any = {};
  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log('invalid form');
      form.control.markAllAsTouched();
      if (!this.cover) {
        this.showError = true;
      }
      return;
    } else {
      let url = 'http://localhost:8080/user/create';
      this.httpClient.post(url, this.userObj).subscribe((res: any) => {
        if (res.status) {
          alert(res.message);
        }
      });
    }
  }
}
