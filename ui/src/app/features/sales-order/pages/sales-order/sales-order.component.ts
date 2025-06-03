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
import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import {
  map,
  tap,
  switchMap,
  distinctUntilChanged,
  debounceTime,
  startWith,
} from 'rxjs/operators';
import { SalesOrderService } from '~features/sales-order/services/sales-order.service';
import { ToastService } from '~core/services/toast.service';
import moment from 'moment';
import { SalesOrderFilterGroupDialogComponent } from '~features/sales-order/components/sales-order-filter-group-dialog/sales-order-filter-group-dialog.component';
import { SalesOrderFormComponent } from '~features/sales-order/components/sales-order-form/sales-order-form.component';
import { DialogComponent } from '~core/components/dialog/dialog.component';
import { SalesOrder } from '~features/sales-order/types/sales-order.type';

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
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './sales-order.component.html',
  styleUrl: './sales-order.component.scss',
})
export class SalesOrderComponent implements OnInit {
  @ViewChild(MatPaginator) salesOrderPaginator!: MatPaginator;
  displayedColumns: string[] = [
    'check',
    'subject',
    'contactName',
    'status',
    'total',
    'assignedTo',
    'createdTime',
    'updatedTime',
    'actions',
  ];
  statusNames: string[] = ['Created', 'Approved', 'Delivered', 'Canceled'];
  statusFromDashboard!: string;
  checkArray: string[] = [];
  isDisabled: boolean = true; // it used to show/hide the mass delete button
  submitted: boolean = false;
  show: boolean = true;
  dataSource = new MatTableDataSource<SalesOrder>([]);
  totalRecords: number = 0;

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
    const currentUserInfo = window.localStorage.getItem('currentUser');
    if (currentUserInfo) {
      const parsedUserInfo = JSON.parse(currentUserInfo);
      const reqParams = [
        {
          paramName: 'isAdmin',
          paramVal: parsedUserInfo.isAdmin,
        },
        {
          paramName: 'userId',
          paramVal: parsedUserInfo._id,
        },
      ];
      this.salesOrderService
        .getListOfSalesOrder(reqParams)
        .subscribe((data) => {
          this.totalRecords = data.length;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.salesOrderPaginator;
        });
      //   this.salesOrderService.getListOfSalesOrder(reqParams),
      //   this.filterSubject,
      //   this.search$,
      // ])
      //   .pipe(
      //     map(
      //       ([
      //         salesOrder,
      //         {
      //           status,
      //           assignedTo,
      //           contactName,
      //           createdTimeFrom,
      //           createdTimeTo,
      //           updatedTimeFrom,
      //           updatedTimeTo,
      //         },
      //         searchResult,
      //       ]) => {
      //         const sourceData = searchResult ? searchResult : salesOrder;
      //         return sourceData.filter((d) => {
      //           return (
      //             (status ? d.status === status : true) &&
      //             (assignedTo ? d.assignedTo === assignedTo : true) &&
      //             (createdTimeFrom
      //               ? moment(d.createdTime).isBefore(createdTimeFrom)
      //               : true) &&
      //             (createdTimeTo
      //               ? moment(d.createdTime).isAfter(createdTimeTo)
      //               : true) &&
      //             (updatedTimeFrom
      //               ? moment(d.updatedTime).isBefore(updatedTimeFrom)
      //               : true) &&
      //             (updatedTimeTo
      //               ? moment(d.updatedTime).isAfter(updatedTimeTo)
      //               : true)
      //           );
      //         });
      //       }
      //     )
      //   )
      //   .subscribe((data) => {
      //     this.dataSource = data;
      //   });
    }
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
