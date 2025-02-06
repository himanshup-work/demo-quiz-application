import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
  searchControl = new FormControl('');
  selectedCategory = 'all';

  // Mock data - replace with actual API calls
  categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'programming', name: 'Programming' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'science', name: 'Science' },
    { id: 'history', name: 'History' },
    { id: 'general', name: 'General Knowledge' },
  ];

  quizzes = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      category: 'programming',
      difficulty: 'Intermediate',
      totalQuestions: 20,
      timeLimit: 30,
      completed: false,
      score: null,
    },
    {
      id: 1,
      title: 'Math Fundamentals',
      category: 'mathematics',
      difficulty: 'Intermediate',
      totalQuestions: 20,
      timeLimit: 30,
      completed: true,
      score: 20,
    },
    // Add more quiz objects
  ];

  userStats = {
    totalQuizzesTaken: 15,
    averageScore: 78.5,
    quizzesCompleted: 12,
    totalPoints: 1250,
    rank: 'Gold',
  };

  recentActivities = [
    {
      type: 'quiz_completed',
      quizName: 'JavaScript Basics',
      score: 85,
      date: new Date('2024-02-04'),
    },
    // Add more activities
  ];

  filteredQuizzes = [...this.quizzes];
  cover: any;

  ngOnInit() {
    // Set up search with debounce
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.filterQuizzes(searchTerm ?? '', this.selectedCategory);
      });
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
    this.filterQuizzes(this.searchControl.value ?? '', this.selectedCategory);
  }

  filterQuizzes(searchTerm: string, category: string) {
    this.filteredQuizzes = this.quizzes.filter((quiz) => {
      const matchesSearch = quiz.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || quiz.category === category;
      return matchesSearch && matchesCategory;
    });
  }

  startQuiz(quizId: number) {
    // Implement quiz start logic
    console.log(`Starting quiz ${quizId}`);
  }
}
