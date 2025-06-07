import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import {
  map,
  tap,
  switchMap,
  distinctUntilChanged,
  debounceTime,
  startWith,
} from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { SalesOrder } from '~features/sales-order/types/sales-order.type';
import { SalesOrderService } from '~features/sales-order/services/sales-order.service';
import { ToastService } from '~core/services/toast.service';
import moment from 'moment';
import { SalesOrderFilterGroupDialogComponent } from '~features/sales-order/components/sales-order-filter-group-dialog/sales-order-filter-group-dialog.component';
import { SalesOrderFormComponent } from '~features/sales-order/components/sales-order-form/sales-order-form.component';
import { DialogComponent } from '~core/components/dialog/dialog.component';
import { SalesOrderDetailsComponent } from '~features/sales-order/components/sales-order-details/sales-order-details.component';

// interface IObjectKeys {
//   [key: string]: string | number | undefined;
// }

@Component({
  selector: 'app-sales-order',
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButton,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './sales-order.component.html',
  styleUrl: './sales-order.component.scss',
})
export class SalesOrderComponent implements OnInit {
  @ViewChild(MatPaginator) salesOrderPaginator!: MatPaginator;
  displayedColumns: string[] = [
    'select',
    'subject',
    'contactName',
    'status',
    'total',
    'assignedTo',
    'createdTime',
    'updatedTime',
    'actions',
  ];
  // displayedHeaders: IObjectKeys  = {
  //   subject: 'Subject',
  //   contactName: 'Contact Name',
  //   status: 'Status',
  //   total: 'Total',
  //   assignedTo: 'Assigned To',
  //   createdTime: 'Created Time',
  //   updatedTime: 'Updated Time',
  // };
  statusNames: string[] = ['Created', 'Approved', 'Delivered', 'Canceled'];
  statusFromDashboard: string = '';
  checkArray: string[] = [];
  isDisabled: boolean = true; // it used to show/hide the mass delete button
  submitted: boolean = false;
  show: boolean = true;
  dataSource = new MatTableDataSource<SalesOrder>([]);
  totalRecords: number = 0;

  status: FormControl = new FormControl('');
  searchText: FormControl = new FormControl('');

  constructor(
    private router: Router,
    protected salesOrderService: SalesOrderService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    // clear params (status) before get all data
    this.router.navigateByUrl('/sales-order');
    // get status passed from dashboard page
    this.route.queryParams.subscribe((params) => {
      if (params['status']) {
        this.statusFromDashboard = params['status'];
        // this.status = new FormControl(this.statusFromDashboard);
        // this.applySelectFilter(this.status.value, 'status');
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.salesOrderService.getListOfSalesOrder().subscribe((data) => {
      this.totalRecords = data.length;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.salesOrderPaginator;
    });
  }

  reset() {
    this.loadData();
  }

  openFilterGroupDialog() {
    const filterDialogRef = this.dialog.open(
      SalesOrderFilterGroupDialogComponent,
      {
        disableClose: true,
        width: '600px',
      }
    );
    filterDialogRef.afterClosed().subscribe((result) => {});
  }

  openFormDialog(action: string, orderId?: string) {
    const formDialogRef = this.dialog.open(SalesOrderFormComponent, {
      disableClose: true,
      width: '1200px',
      data: {
        action,
        orderId,
      },
    });
    formDialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  openSalesOrderDetailsDialog(orderId: string) {
    const salesOrderDetailsDialogRef = this.dialog.open(
      SalesOrderDetailsComponent,
      {
        disableClose: true,
        width: '600px',
        data: {
          orderId,
        },
      }
    );
    salesOrderDetailsDialogRef.afterClosed().subscribe((result) => {});
  }

  onDelete(orderId: string, subject: string) {
    const confirmDialogRef = this.dialog.open(DialogComponent, {
      disableClose: false,
    });
    confirmDialogRef.componentInstance.content = `You want to delete the "${subject}"?`;
    confirmDialogRef.componentInstance.sendingSubmitSignal.subscribe(
      (signal) => {
        if (signal) {
          this.salesOrderService
            .deleteSalesOrder(
              orderId,
              [],
              [{ name: 'skipLoading', value: 'true' }]
            )
            .pipe(
              tap((res) => {
                if (res['status'] === 1) {
                  this.toastService.showSuccessMessage(
                    'Delete the Sales order!'
                  );
                } else {
                  this.toastService.showErrorMessage('Delete the Sales order!');
                }
              })
            )
            .subscribe(() => {
              confirmDialogRef.close();
            });
        }
      }
    );
    confirmDialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }
}
