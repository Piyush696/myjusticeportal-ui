import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { LawyerService } from 'app/services/lawyer.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css'],
})
export class StripeComponent implements OnDestroy, AfterViewInit, OnChanges, OnInit {
  cardForm: FormGroup;
  @ViewChild('cardInfo') cardInfo: ElementRef;
  _totalAmount: number;
  card: any;
  cardHandler = this.onChange.bind(this);
  @Output() onPayEvent = new EventEmitter()
  cardError: string;
  userData: any;
  isCardError: boolean = true
  @Input() plan: string;
  @Input() totalCount: number;
  @Input() facilitiesList: any[];
  @Input() update: boolean;
  @Output() isloading = new EventEmitter()
  @Input() isPaybtnDisabled;
  @Input() isDisabled: boolean;

  constructor(
    private cd: ChangeDetectorRef, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StripeComponent>, private lawyerService: LawyerService,
    private toasterService: ToasterService, private store: Store<any>,
  ) {
    this._totalAmount = data['totalAmount'];
  }


  ngOnInit(): void {
    this.createCardControl();
    this.getUserDetailsFromStore();
  }

  ngOnChanges(): void {
    //console.log(this.facilitiesList)
  }

  createCardControl() {
    this.cardForm = this.fb.group({
      coupon: ['', Validators.required, this.validateCoupon.bind(this)]
    })
  }

  async validateCoupon(control: AbstractControl) {
    const result: any = await this.lawyerService.validate_coupan({
      coupon: control.value,
    }).toPromise();
    if (!result.success) {
      return { invalidCoupon: true };
    } else {
      return null;
    }
  }

  ngOnDestroy() {
    if (this.card) {
      // We remove event listener here to keep memory clean
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  ngAfterViewInit() {
    this.getUserDetailsFromStore();
    this.initiateCardElement();
  }

  getUserDetailsFromStore() {
    this.store.select(s => s.userInfo).subscribe(x => {
      this.userData = x
    });
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
    this.card = elements.create('card', { cardStyle });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  onChange({ error }) {
    if (error) {
      this.isCardError = true
      this.cardError = error.message;
    } else {
      this.isCardError = false
      this.cardError = null;
    }
    // this.cd.detectChanges();
  }

  async createStripeToken() {
    this.isloading.emit(true)
    const { token, error } = await stripe.createToken(this.card);
    if (this.update) {
      let facilityList = [];
      this.facilitiesList.filter((ele) => {
        if (ele.isSelected) {
          if (this.userData.roles[0].roleId == 5) {
            const facilityData = {
              "facilityId": ele.facilityId,
              "lawyerId": this.userData.userId
            }
            facilityList.push(facilityData)
          } else {
            const facilityData = {
              "facilityId": ele.facilityId,
              "isSponsors": ele.addOns.sponsors,
              "isPremium": ele.addOns.premium,
              "lawyerId": this.userData.userId,
              "isSelected": true,
              "planSelected": this.plan
            }
            facilityList.push(facilityData)
          }
        }
      })
      const data = {
        "userId": this.userData.userId,
        "amount": Math.round(this.totalCount) * 100,
        "currency": 'usd',
        "interval": 'month',
        "facilityList": facilityList
      }
      this.lawyerService.updatePlan(data).subscribe((res: any) => {
        if (res.success) {
          this.toasterService.showSuccessToater('Plan updated')
          this.onPayEvent.emit(true)
          this.isloading.emit(false)
        }
      })
    } else {
      const { token, error } = await stripe.createToken(this.card);
      if (token) {
        let facilityList = [];
        const data = {
          "token": token.id,
          "email": this.userData.userName
        }
        this.lawyerService.postPay(data).subscribe((addCard: any) => {
          if (addCard.data) {
            this.facilitiesList.filter((ele) => {
              if (ele.isSelected) {
                if (this.userData.roles[0].roleId == 5) {
                  const facilityData = {
                    "facilityId": ele.facilityId,
                    "defenderId": this.userData.userId,
                    "isSelected": true,
                  }
                  facilityList.push(facilityData)
                } else {
                  const facilityData = {
                    "facilityId": ele.facilityId,
                    "isSponsors": ele.addOns.sponsors,
                    "isPremium": ele.addOns.premium,
                    "lawyerId": this.userData.userId,
                    "isSelected": true,
                    "planSelected": this.plan
                  }
                  facilityList.push(facilityData)
                }
              }
            })
            const data = {
              "customer": addCard.data.customer,
              "userId": this.userData.userId,
              "amount": Math.round(this.totalCount) * 100,
              "currency": 'usd',
              "interval": 'month',
              "facilityList": facilityList
            }
            this.lawyerService.subscribePlan(data).subscribe((subscribePlan: any) => {
              if (subscribePlan.data) {
                this.onPayEvent.emit(true)
                window.location.reload();
                this.toasterService.showSuccessToater('You have subscribed successfully!')
              } else {
                this.toasterService.showWarningToater('Something went wrong. Please try again')
              }
            })
          }
          this.onSuccess(token);
        })
      } else {
        this.onError(error);
      }
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
