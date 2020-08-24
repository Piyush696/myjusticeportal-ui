import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() selectedRoleId: number;
  @Output() isRegisterEvent = new EventEmitter();

  constructor(private fb: FormBuilder, public securityService: SecurityService) { }

  ngOnInit(): void {
    this.createFormControl();
    this.onGetAllSecurityQuestions();
  }

  createFormControl() {
    this.securityQuestionForm = this.fb.group({
      securityQuestionId: ['', [Validators.required]],
      answer: ['', [Validators.required]]
    });
  }

  onGetAllSecurityQuestions() {
    this.securityService.getAllSecurityRoles(1).subscribe((questions: any) => {
      this.securityQuestions = questions.data;
      this.originalSecurityQuestions = questions.data;
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
    this.securityService.createSecurityAnswers(formValue).subscribe((data: any) => {
      this.securityQuestionForm.reset();
    });
  }

  onClickRegister() {
    this.setAnswers();
    this.isRegisterEvent.emit(true);
  }
}