import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css',
})
export class CreateQuizComponent implements OnInit {
  quizForm!: FormGroup;
  maxQuestions = 15;
  http = inject(HttpClient);

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      quizTitle: ['', [Validators.required, Validators.minLength(3)]],
      quizCategory: ['', [Validators.required]],
      quizDescription: ['', [Validators.required, Validators.minLength(25)]],
      passingScore: ['', [Validators.required]],
      timeLimit: ['', [Validators.required]],
      questions: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.addQuestion(); // Add the first question by default
  }

  get questionsFormArray(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  getOptionsFormArray(index: number): FormArray {
    return this.questionsFormArray.at(index).get('options') as FormArray;
  }

  addQuestion() {
    if (this.questionsFormArray.length < this.maxQuestions) {
      this.questionsFormArray.push(this.createQuestionFormGroup());
    }
  }

  removeQuestion(index: number) {
    this.questionsFormArray.removeAt(index);
  }

  markCorrectAnswer(questionIndex: number, optionIndex: number) {
    const options = this.getOptionsFormArray(questionIndex);
    options.controls.forEach((optionControl, index) => {
      optionControl.get('isCorrect')?.setValue(index === optionIndex);
    });
  }

  onSubmit() {
    if (this.quizForm.invalid) {
      console.log('INVALID_FORM!!!!!!!!!!!');
      console.log(this.quizForm.value);
    }
    const formData = { ...this.quizForm.value };

    // Format time to HH:mm:ss
    if (formData.timeLimit) {
      formData.timeLimit =
        formData.timeLimit.includes(':') &&
        formData.timeLimit.split(':').length === 2
          ? `${formData.timeLimit}:00`
          : formData.timeLimit;
    }

    const quizData = {
      quizTitle: formData.quizTitle,
      categoryName: formData.quizCategory,
      quizDescription: formData.quizDescription,
      timeLimit: formData.timeLimit,
      passingScore: formData.passingScore,
      questions: formData.questions.map((q: any) => ({
        questionText: q.questionText,
        options: q.options.map((opt: any) => ({
          optionText: opt.optionText,
          isCorrect: opt.isCorrect,
        })),
      })),
    };

    let url = 'http://localhost:8080/quiz/create';
    this.http.post(url, quizData).subscribe((res: any) => {
      if (res.status) {
        alert(res.message);
      }
    });
    console.log(this.quizForm.value);
  }

  private createQuestionFormGroup(): FormGroup {
    return this.fb.group({
      questionText: ['', [Validators.required, Validators.minLength(5)]],
      options: this.fb.array([
        this.fb.group({
          optionText: ['', Validators.required],
          isCorrect: false,
        }),
        this.fb.group({
          optionText: ['', Validators.required],
          isCorrect: false,
        }),
        this.fb.group({
          optionText: ['', Validators.required],
          isCorrect: false,
        }),
        this.fb.group({
          optionText: ['', Validators.required],
          isCorrect: false,
        }),
      ]),
    });
  }
}
