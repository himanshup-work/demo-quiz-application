import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  userForm: FormGroup = new FormGroup({
    fullName: new FormControl('Himanshu Pal', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('himanshu@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    username: new FormControl('himanshu1999', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('12345678', [
      Validators.required,
      Validators.minLength(6),
    ]),
    profileImage: new FormControl('', [Validators.required]),
  });

  cover: any;
  cover_file: any;
  showError = false;

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
  formValue: any;

  onSubmit() {
    if (this.userForm.invalid || this.userForm.dirty) {
      this.userForm.markAllAsTouched();
    }
    this.formValue = this.userForm.value;
  }
}
