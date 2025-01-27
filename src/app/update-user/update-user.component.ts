import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
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
export class UpdateUserComponent implements OnInit{
  httpClient = inject(HttpClient);
  
  userForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    profileImage: new FormControl('', [Validators.required]),
  });

  cover: any;
  cover_file: any;
  showError = false;
  
  ngOnInit(): void {
    
    let url = "http://localhost:8080/user/926312db-4157-4027-a21d-b241d8b0277f"
    this.httpClient.get(url).subscribe((res: any)=>{
      this.userForm.controls['fullName'].setValue(res.data.fullName);
      this.userForm.controls['email'].setValue(res.data.email);
      this.userForm.controls['username'].setValue(res.data.username);
      this.userForm.controls['password'].setValue(res.data.password);
      this.cover = 'data:image/jpeg;base64,' + res.data.image;
    })
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
  formValue: any;

  onSubmit() {
    if (this.userForm.invalid || this.userForm.dirty) {
      this.userForm.markAllAsTouched();
    }
    this.formValue = this.userForm.value;
  }
}
