import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'app/services/security.service';

@Component({
  selector: 'app-security-question',
  templateUrl: './security-question.component.html',
  styleUrls: ['./security-question.component.css']
})
export class SecurityQuestionComponent implements OnInit, OnChanges {
  @Input() selectedRoleId: number;
  securityQuestions: any;
  @Output() isRegisterEvent = new EventEmitter()
  isRegister: boolean;
  count: number = 1;
  securityQuestionForm: FormGroup;

  constructor(private fb: FormBuilder, public securityService: SecurityService) { }

  ngOnInit(): void {
    this.createFormControl();
  }

  createFormControl() {
    this.securityQuestionForm = this.fb.group({
      securityQuestionId: ['', [Validators.required]],
      answer: ['', [Validators.required]]
    });
  }

  ngOnChanges() {
    this.securityService.getAllSecurityRoles(this.selectedRoleId).subscribe((questions: any) => {
      this.securityQuestions = questions.data
    })
  }

  onAnswerQuestion() {
    this.securityQuestions = this.securityQuestions.filter(filteredquestion => filteredquestion.securityQuestionId != parseInt(this.securityQuestionForm.get('securityQuestionId').value))
    this.count++;
    this.setAnswers();
    if (this.count == 3) {
      this.isRegister = true;
    }
  }

  setAnswers() {
    this.securityService.createSecurityAnswers(this.securityQuestionForm.value).subscribe((data: any) => {
      this.securityQuestionForm.reset();
    })
  }

  register() {
    this.setAnswers();
    this.isRegisterEvent.emit(true)
  }
}
