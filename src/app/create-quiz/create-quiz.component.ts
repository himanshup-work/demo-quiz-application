import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder,  FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  imports: [ReactiveFormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css',
})
export class CreateQuizComponent {
  quizForm: FormGroup = new FormGroup({});
  maxQuestions = 10;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.quizForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      questions: this.fb.array([this.createQuestionGroup()])
    });
  }

  get questionsFormArray() {
    return this.quizForm.get('questions') as FormArray;
  }

  createQuestionGroup(): FormGroup {
    return this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]],
      options: this.fb.array([
        ['', [Validators.required]],
        ['', [Validators.required]],
        ['', [Validators.required]],
        ['', [Validators.required]]
      ])
    });
  }

  getOptionsFormArray(questionIndex: number): FormArray {
    return this.questionsFormArray.at(questionIndex).get('options') as FormArray;
  }

  addQuestion() {
    if (this.questionsFormArray.length < this.maxQuestions) {
      this.questionsFormArray.push(this.createQuestionGroup());
    }
  }

  removeQuestion(index: number) {
    if (this.questionsFormArray.length > 1) {
      this.questionsFormArray.removeAt(index);
    }
  }

  onSubmit() {
    if (this.quizForm.valid) {
      console.log('Quiz Data:', this.quizForm.value);
      // TODO: Implement submission logic
    } else {
      this.markFormGroupTouched(this.quizForm);
    }
  }

  // Helper method to mark all controls as touched to show validation errors
  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
