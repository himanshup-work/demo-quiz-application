import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css',
})
export class CreateQuizComponent implements OnInit{
  quizForm!: FormGroup;
  maxQuestions = 15; // Adjust as needed

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.quizForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      questions: this.fb.array([])
    });
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

  onSubmit() {
    console.log(this.quizForm.value);
  }

  private createQuestionFormGroup(): FormGroup {
    return this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]],
      options: this.fb.array([
        ['', Validators.required],
        ['', Validators.required],
        ['', Validators.required],
        ['', Validators.required] // Adjust number of options as needed
      ]),
      correctOption: ['', Validators.required]
    });
  }
}