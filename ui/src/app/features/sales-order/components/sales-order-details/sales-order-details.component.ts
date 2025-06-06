import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SalesOrderService } from '~features/sales-order/services/sales-order.service';
import { SalesOrder } from '~features/sales-order/types/sales-order.type';

@Component({
  selector: 'app-sales-order-details',
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './sales-order-details.component.html',
  styleUrl: './sales-order-details.component.scss',
})
export class SalesOrderDetailsComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<SalesOrderDetailsComponent>);
  private salesOrderService = inject(SalesOrderService);
  data = inject(MAT_DIALOG_DATA);
  salesOrder!: SalesOrder;

  ngOnInit(): void {
    if (this.data && this.data.orderId) {
      this.salesOrderService
        .getSalesOrder(
          this.data.orderId,
          [],
          [{ name: 'skipLoading', value: 'true' }]
        )
        .subscribe((data) => {
          this.salesOrder = data;
        });
    }
  }
}
