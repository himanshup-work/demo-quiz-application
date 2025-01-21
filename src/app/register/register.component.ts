import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  model: any = {};
  cover!: string;
  cover_file: any;
  showError = false;
  onSubmit(form: NgForm) {
    if (form.invalid || !this.cover) {
      console.log('invalid form');
      form.control.markAllAsTouched();
      if (!this.cover) {
        this.showError = true;
      }
      return;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cover_file = file;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result!.toString();
        this.cover = dataUrl;
      };
      reader.readAsDataURL(file);
      this.showError = false;
    }
  }
}
