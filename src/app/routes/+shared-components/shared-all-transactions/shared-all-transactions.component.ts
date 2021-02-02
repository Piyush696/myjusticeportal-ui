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

  constructor(private StripeService:StripeService,private lawyerService: LawyerService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getListTransactions();
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

  viewInvoices(invoice){
    window.open(invoice.receipt_url, "_blank");
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
      this.totalCharge = transactionsDetails.data[0].amount / 100;
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

    onCloseModal() {
      this.dialog.closeAll();
    }
    
    updateCard(templateRef) {
      let dialogRef = this.dialog.open(templateRef, {
        width: '613px'
      });
    }

}
