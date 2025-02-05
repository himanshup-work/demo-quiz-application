import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { NgFor } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IQuiz } from '../../model/quiz.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-home',
  imports: [NgFor, MatIconModule, FormsModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
  
  quizzies: IQuiz[] = [
    {quizTitle: 'AQuiz Title 1', quizCategory: 'Programming', quizDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', passingScore: '80%', timeLimit: '30 mins'},
    {quizTitle: 'BQuiz Title 2', quizCategory: 'Mathematics', quizDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', passingScore: '80%', timeLimit: '30 mins'},
    {quizTitle: 'CQuiz Title 2', quizCategory: 'Science', quizDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', passingScore: '80%', timeLimit: '30 mins'},
    {quizTitle: 'DQuiz Title 2', quizCategory: 'History', quizDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', passingScore: '80%', timeLimit: '30 mins'}
  ]

  filteredQuizzes = [...this.quizzies];

  ngOnInit() {
    // Set up search with debounce
    // this.searchControl.valueChanges
    //   .pipe(debounceTime(300), distinctUntilChanged())
    //   .subscribe((searchTerm) => {
    //     this.filterQuizzes(searchTerm ?? '', this.selectedCategory);
    //   });
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
    this.filterQuizzes(this.searchControl.value ?? '', this.selectedCategory);
  }

  filterQuizzes(searchTerm: string, category: string) {
    this.filteredQuizzes = this.quizzies.filter((quiz) => {
      const matchesSearch = quiz.quizTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
        console.log(quiz.quizCategory + " and " +category)
        const matchesCategory = category === 'all' || quiz.quizCategory
        .toLowerCase()
        .includes(this.selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }

}
