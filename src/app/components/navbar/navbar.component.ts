import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isSidebarOpen = false;
  userName = 'John Doe'; // Replace with actual user data
  userEmail = 'john@example.com'; // Replace with actual user data
  userAvatar = 'images/profile.png'; // Replace with actual user avatar
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  isUserLoggedIn: boolean = StorageService.isUserLoggedIn();
  router = inject(Router);

  ngOnInit(): void {
      this.router.events.subscribe(event => {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        // this.isAdminLoggedIn = true;
        // this.isUserLoggedIn = StorageService.isUserLoggedIn();
        this.isUserLoggedIn = true;
      });
  }


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    document.body.style.overflow = this.isSidebarOpen ? 'hidden' : 'auto';
  }

  logout() {
    this.toggleSidebar();
    this.isUserLoggedIn = false;
    this.isUserLoggedIn = false;
    // Implement logout logic
    console.log('Logging out...');
  }
}
