import { CompileShallowModuleMetadata } from '@angular/compiler';
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
    let y;
    y = this.originalSecurityQuestions.filter((filterr) => {
      if (filterr.securityQuestionId == this.questionId) {
     //   console.log(filterr);
        return filterr
      }
    })
    y = this.originalSecurityQuestions.find((filterr) => {
      return filterr.securityQuestionId == this.questionId;
    })
    let qa = this.securityQuestionAnswered.push()
   /// console.log(this.securityQuestionAnswered);
  //  console.log(y.securityQuestionId)
    this.securityQuestionForm.get('securityQuestionId').setValue(y.securityQuestionId)
    // let qa=Object.fromEnteries(
    //   Object.entries.(qa).map(([key,value])=>[key,value]));
    //  console.log(qa.answer);
   // console.log(qa.answer)
    //    this.securityQuestionForm.get('securityQuestionId').setValue(qa.securityQuestionId)
    // let qa=this.securityQuestionAnswered.push(fv)
    // console.log(fv);

  
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
    //console.log(x);
    x = this.originalSecurityQuestions.find((filteredquestion) => {
      return filteredquestion.securityQuestionId == this.questionId;
    })
    let questionAnswer = this.securityQuestionAnswered.pop()
    this.securityQuestionForm.get('securityQuestionId').setValue(questionAnswer.securityQuestionId)
    this.securityQuestionForm.get('answer').setValue(questionAnswer.answer)
    this.securityQuestions = this.securityQuestions.concat(x);
    if (this.count == 0) {
      this.securityQuestions = [];
      this.securityQuestions = this.originalSecurityQuestions;
    }
  }

  setAnswers() {
    this.questionId = this.securityQuestionForm.get('securityQuestionId').value;
    let formValue = this.securityQuestionForm.value;
    //console.log(formValue);
    //console.log(this.securityQuestionAnswered);
    this.securityQuestionAnswered.push(formValue)
    this.securityQuestionForm.reset();
  }

  onClickRegister() {
    this.spinner = true;
    this.onClickNext()
    if (this.count < 3) {
      this.setAnswers();
    }
    this.isRegisterEvent.emit(this.securityQuestionAnswered);
  }

  onPreviousClick() {
    this.isPreviousClick.emit(true)
  }
}