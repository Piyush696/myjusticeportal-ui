import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { LawyerService } from 'app/services/lawyer.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-update-card-modal',
  templateUrl: './update-card-modal.component.html',
  styleUrls: ['./update-card-modal.component.css']
})
export class UpdateCardModalComponent implements OnDestroy, AfterViewInit, OnInit {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: string;
  isCardError: boolean = true
  @Output() cardChange = new EventEmitter();
  invalidCard: boolean;
  discount: number;

  constructor(
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<UpdateCardModalComponent>, private lawyerService: LawyerService,
    private toasterService: ToasterService,
  ) {
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.card) {
      // We remove event listener here to keep memory clean
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  ngAfterViewInit() {
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
      const { token, error } = await stripe.createToken(this.card);
      if (token) {
        this.invalidCard = false
        const data = {
          "token": token.id,
        }
        this.lawyerService.updateCardDetails(data).subscribe((card:any)=>{
          if(card.success){
            this.cardChange.emit(true)
            this.toasterService.showSuccessToater('Card updated successfully.')
          }
        })
      } else {
        this.invalidCard = true
        this.onError(error);
      }
  }

  close(){
    this.cardChange.emit(true);
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
