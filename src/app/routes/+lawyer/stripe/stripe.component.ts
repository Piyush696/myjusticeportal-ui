import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { LawyerService } from 'app/services/lawyer.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css'],
})
export class StripeComponent implements OnDestroy, AfterViewInit {

  @ViewChild('cardInfo') cardInfo: ElementRef;
  _totalAmount: number;
  card: any;
  cardHandler = this.onChange.bind(this);
  @Output() onPayEvent = new EventEmitter()
  cardError: string;
  userData: any;
   @Input() totalCount:number;
  constructor(
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StripeComponent>,private lawyerService: LawyerService, private toasterService: ToasterService, private store: Store<any>,
  ) {
    this._totalAmount = data['totalAmount'];
  }

  ngOnDestroy() {
    if (this.card) {
      // We remove event listener here to keep memory clean
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  ngAfterViewInit() {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.userData = x
    });
      this.initiateCardElement();
  }

  initiateCardElement() {
    // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    const elements = stripe.elements();
    this.card = elements.create('card',{cardStyle});
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  onChange({ error }) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
    this.cd.detectChanges();
  }
  
  async createStripeToken() {
    const { token, error } = await stripe.createToken(this.card);
    if (token) {
      const data = {
        "token":token.id,
        "email":'pp@gmail.com'
      }
      this.lawyerService.postPay(data).subscribe((addCard: any) => {
        if(addCard.data){
          const data = {
            "customer": addCard.data.customer,
            "userId": this.userData.userId,
            "amount":  Math.round(this.totalCount) * 100,
            "currency":'usd',
            "interval":'month'
          }
          this.lawyerService.subscribePlan(data).subscribe((subscribePlan: any) => {
            if (subscribePlan.data) {
              this.onPayEvent.emit(true)
              this.toasterService.showSuccessToater('Subscribe Successfully.')
            } else {
              this.toasterService.showWarningToater('Something went wrong.')
            }
          })
        }
        this.onSuccess(token);
      })
    } else {
      this.onError(error);
    }
  }

  onSuccess(token) {
    this.dialogRef.close({ token });
  }
  onError(error) {
    if (error.message) {
      this.cardError = error.message;
    }
  }
}