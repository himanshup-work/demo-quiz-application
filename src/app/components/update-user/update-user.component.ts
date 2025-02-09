import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUserUpdate } from '../../model/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent implements OnInit {
  profileForm: FormGroup;
  imagePreview: string | null = null;
  isLoading = false;
  error: string | null = null;
  user: IUserUpdate | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      bio: [''],
      profileImage: [null]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.isLoading = true;
    this.error = null;

    this.userService.getUser().subscribe({
      next: (response) => {
        if (response.status) {
          this.user = response.data;
          // Update form with user data after receiving it
          this.profileForm.patchValue({
            firstName: this.user?.firstName,
            lastName: this.user?.lastName,
            email: this.user?.email,
            username: this.user?.username,
            bio: this.user?.bio || '',
          });
          if (this.user?.image) {
            this.imagePreview = this.user?.image;
          }
        } else {
          this.error = response.message;
        }
      },
      error: (error) => {
        this.error = error.message || 'An error occurred';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.error = 'Please select an image file';
        return;
      }
      
      // Validate file size (e.g., 5MB max)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.error = 'File size should not exceed 5MB';
        return;
      }

      this.profileForm.patchValue({ profileImage: file });
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      this.error = null;

      // Create FormData object for file upload
      const formData = new FormData();
      Object.keys(this.profileForm.value).forEach(key => {
        if (key === 'profileImage' && this.profileForm.get(key)?.value) {
          formData.append(key, this.profileForm.get(key)?.value);
        } else if (this.profileForm.get(key)?.value) {
          formData.append(key, this.profileForm.get(key)?.value);
        }
      });

      this.userService.getUser().subscribe({
        next: (res) => {
          if (res.status) {
            // Handle success (e.g., show success message, redirect)
            console.log('Profile updated successfully');
            this.loadUserData(); // Refresh user data
          } else {
            this.error = res.message;
          }
        },
        error: (error) => {
          this.error = error.message || 'Failed to update profile';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}