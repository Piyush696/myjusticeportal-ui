import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'app/services/security.service';

@Component({
  selector: 'app-security-question',
  templateUrl: './security-question.component.html',
  styleUrls: ['./security-question.component.css']
})

export class SecurityQuestionComponent implements OnInit {
  securityQuestionForm: FormGroup;
  securityQuestions: any = [];
  backSelectedQuestion: any = [];
  count: number = 0;
  progressValue: number = 0;
  originalSecurityQuestions: any;
  questionId: any;
  securityQuestionAnswered = [];
  spinner: boolean = false;

  @Output() isRegisterEvent = new EventEmitter();
  @Output() isPreviousClick = new EventEmitter();

  constructor(private fb: FormBuilder, public securityService: SecurityService) { }

  ngOnInit(): void {
    this.createFormControl();
    this.getAllSecurityQuestions();
  }

  createFormControl() {
    this.securityQuestionForm = this.fb.group({
      securityQuestionId: ['', [Validators.required]],
      answer: ['', [Validators.required]]
    });
  }

  getAllSecurityQuestions() {
    let selectedRoleId = 1;
    this.securityService.getAllSecurityRoles(selectedRoleId).subscribe((questions: any) => {
      this.securityQuestions = questions.data
      this.originalSecurityQuestions = questions.data
    })
  }

  onClickNext() {
    this.securityQuestions = this.securityQuestions.filter(filteredquestion => filteredquestion.securityQuestionId != parseInt(this.securityQuestionForm.get('securityQuestionId').value));
    this.count = this.count + 1;
    this.progressValue = (100 / 3) * this.count;
    this.setAnswers();
  }

  onClickBack() {
    let x;
    this.count = this.count - 1;
    this.progressValue = (100 / 3) * this.count;
    x = this.originalSecurityQuestions.filter((filteredquestion) => {
      if (filteredquestion.securityQuestionId == this.questionId) {
        return filteredquestion;
      }
    })
    this.securityQuestions = this.securityQuestions.concat(x);
    if (this.count == 0) {
      this.securityQuestions = [];
      this.securityQuestions = this.originalSecurityQuestions;
    }
  }

  setAnswers() {
    this.questionId = this.securityQuestionForm.get('securityQuestionId').value;
    let formValue = this.securityQuestionForm.value;
      this.securityQuestionAnswered.push(formValue)
    this.securityQuestionForm.reset();
  }

  onClickRegister() {
    this.spinner = true;
    this.onClickNext()
    if(this.count < 3){
      this.setAnswers();
    }
    this.isRegisterEvent.emit(this.securityQuestionAnswered);
  }

  onPreviousClick() {
    this.isPreviousClick.emit(true)
  }
}