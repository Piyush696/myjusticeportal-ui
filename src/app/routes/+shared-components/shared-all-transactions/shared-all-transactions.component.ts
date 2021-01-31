import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LawyerService } from 'app/services/lawyer.service';
import { StripeService } from 'app/services/stripe.service';

@Component({
  selector: 'app-shared-all-transactions',
  templateUrl: './shared-all-transactions.component.html',
  styleUrls: ['./shared-all-transactions.component.css']
})
export class SharedAllTransactionsComponent implements OnInit {

  displayedColumns: string[] = ["created", "amount", "last4", "status", "action"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  cardDetails: any;
  totalCharge: any;
  changeCardForm: any;

  constructor(private StripeService:StripeService,private lawyerService: LawyerService,  public dialog: MatDialog,  private fb: FormBuilder) { }

  ngOnInit(): void {
    this.changeCardForm = this.fb.group({
      nameOnCard: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), this.cardPatternValidation.bind(this)], this.cardValidation.bind(this)],
      exp_month: ['', [Validators.required]],
      exp_year: ['', [Validators.required]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), this.cardPatternValidation.bind(this)]],
      coupon: ['', Validators.required, this.validateCoupon.bind(this)]
    });
    this.getListTransactions();
    this.getUserCardDetails();
  }

  cardPatternValidation(control: AbstractControl) {
    const pattern = /([0-9])$/;
    if (control.value) {
      if (!control.value.match(pattern)) {
        return { invalidCardPattern: true };
      }
      return null;
    }
  }

  viewInvoices(invoices){
    window.open(invoices.receipt_url, "_blank");
  }

  async cardValidation(control: AbstractControl) {
    const result: any = await this.lawyerService.validateCard({
      number: control.value,
    }).toPromise();
    if (!result.success) {
      return { invalidCard: true };
    } else {
      return null;
    }
  }

  getListTransactions(){
    this.StripeService.listAllTransactions().subscribe((transactionsDetails:any)=>{
      console.log(transactionsDetails)
      this.totalCharge = transactionsDetails.data[0].amount / 100
      console.log(this.totalCharge)
      this.dataSource = new MatTableDataSource(transactionsDetails.data);
      this.dataSource.sortingDataAccessor = (item: any, property) => {
        switch (property) {
          case 'last4': if (item) return item.source.last4;
          default: if (typeof (item[property]) == 'string') {
            return item[property].toLowerCase();
          } else {
            return item[property]
          }
        }
      };
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUserCardDetails() {
    this.lawyerService.getCardDetails().subscribe((res: any) => {
      this.cardDetails = res.data
    })
  }

    // pagination.
    getPageSizeOptions(): number[] {
      if (this.dataSource.data.length > 500)
        return [10, 50, 100, 500, this.dataSource.paginator?.length];
      else if (this.dataSource.data.length > 100) {
        return [10, 50, 100, this.dataSource.paginator?.length];
      }
      else if (this.dataSource.data.length > 50) {
        return [10, 50, this.dataSource.paginator?.length];
      }
      else if (this.dataSource.data.length > 10) {
        return [10, this.dataSource.paginator?.length];
      }
      else {
        return [10];
      }
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

    addCard() {
      // this.spinner = true
      // this.lawyerService.updateCardDetails({
      //   number: this.changeCardForm.get('cardNumber').value, exp_month: this.changeCardForm.get('exp_month').value, name: this.changeCardForm.get('nameOnCard').value,
      //   exp_year: this.changeCardForm.get('exp_year').value, cvc: this.changeCardForm.get('cvc').value, customerId: this.custId,
      // }).subscribe(
      //   (res: any) => {
      //     this.getUserDetails()
      //     this.spinner = false
      //     this.changeCardForm.reset()
      //     if (res.success) {
      //       this.changeCardForm.reset();
      //     }
      //   })
    }

    onCloseModal() {
      this.dialog.closeAll();
    }
    
    updateCard(templateRef) {
      let dialogRef = this.dialog.open(templateRef, {
        width: '613px'
      });
    }

}
