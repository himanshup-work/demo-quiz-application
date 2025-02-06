import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IQuiz } from '../../model/quiz.model';

@Component({
  selector: 'app-home',
  imports: [NgFor, MatIconModule, FormsModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  searchControl = new FormControl('');
  selectedCategory = 'all';

  // Simplified categories array
  readonly categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'programming', name: 'Programming' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'science', name: 'Science' },
    { id: 'history', name: 'History' },
    { id: 'general', name: 'General Knowledge' },
  ] as const;
  
  // Sample quiz data
  private readonly quizzes: IQuiz[] = [
    {
      quizTitle: 'AQuiz Title 1',
      quizCategory: 'Programming',
      quizDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      passingScore: '80%',
      timeLimit: '30 mins'
    },
    {
      quizTitle: 'BQuiz Title 1',
      quizCategory: 'Mathematics',
      quizDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      passingScore: '80%',
      timeLimit: '30 mins'
    },
    {
      quizTitle: 'CQuiz Title 1',
      quizCategory: 'Science',
      quizDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      passingScore: '80%',
      timeLimit: '30 mins'
    },
    {
      quizTitle: 'DQuiz Title 1',
      quizCategory: 'History',
      quizDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      passingScore: '80%',
      timeLimit: '30 mins'
    },
    {
      quizTitle: 'EQuiz Title 1',
      quizCategory: 'General Knowledge',
      quizDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      passingScore: '80%',
      timeLimit: '30 mins'
    }
    // ... other quiz items
  ];

  filteredQuizzes = this.quizzes;

  ngOnInit(): void {
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges.subscribe(searchTerm => 
      this.updateFilteredQuizzes(searchTerm ?? '')
    );
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.updateFilteredQuizzes(this.searchControl.value ?? '');
  }

  private updateFilteredQuizzes(searchTerm: string): void {
    const search = searchTerm.toLowerCase();
    const category = this.selectedCategory.toLowerCase();
    
    this.filteredQuizzes = this.quizzes.filter(quiz => 
      quiz.quizTitle.toLowerCase().includes(search) && 
      (category === 'all' || quiz.quizCategory.toLowerCase().includes(category))
    );
  }
}