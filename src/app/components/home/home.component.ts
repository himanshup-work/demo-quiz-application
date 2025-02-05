import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [NgFor, MatIconModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  searchText = '';
  selectedCategory = '';

  categories = [
    { value: 'all', name: 'All Categories' },
    { value: 'programming', name: 'Programming' },
    { value: 'mathematics', name: 'Mathematics' },
    { value: 'science', name: 'Science' },
    { value: 'history', name: 'History' },
  ];
}
