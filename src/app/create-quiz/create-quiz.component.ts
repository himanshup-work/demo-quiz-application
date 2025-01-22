import { Component, OnInit } from '@angular/core';
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
  imports: [ReactiveFormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css',
})
export class CreateQuizComponent implements OnInit {
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  quizForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.quizForm = this.formBuilder.group({
      quizTitle: ['', Validators.required],
      questions: this.formBuilder.array([]),
    });
  }
  ngOnInit(): void {
    // this.addQuestion();
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion() {
    const questionForm = this.formBuilder.group({
      questionText: ['', Validators.required],
      options: this.formBuilder.array([
        this.formBuilder.control('', Validators.required),
        this.formBuilder.control('', Validators.required),
        this.formBuilder.control('', Validators.required),
        this.formBuilder.control('', Validators.required),
      ]),
      correctOption: [0, Validators.required],
    });

    // // Add default 4 options
    // const optionsArray = questionForm.get('options') as FormArray;
    // for (let i = 0; i < 4; i++) {
    //   optionsArray.push(this.formBuilder.control('', Validators.required));
    // }

    this.questions.push(questionForm);
  }

  getOptionsFormArray(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }
}
