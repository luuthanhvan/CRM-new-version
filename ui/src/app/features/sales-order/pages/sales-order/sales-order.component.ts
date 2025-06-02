import { Component, OnInit, inject } from '@angular/core';
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
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
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
import type { User } from '~features/user/types/user.type';
import { AuthService } from '~features/authentication/services/auth.service';
import { DateRangeValidator } from '~core/validators/common.validator';
import { SalesOrder } from '~features/sales-order/types/sales-order.type';
import { SalesOrderService } from '~features/sales-order/services/sales-order.service';
import { UserService } from '~features/user/services/user.service';
import { ToastService } from '~core/services/toast.service';
import moment from 'moment';

interface FilterCriteria {
  status?: string;
  assignedTo?: string;
  contactName?: string;
  createdTimeFrom?: any;
  createdTimeTo?: any;
  updatedTimeFrom?: any;
  updatedTimeTo?: any;
}

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
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './sales-order.component.html',
  styleUrl: './sales-order.component.scss',
})
export class SalesOrderComponent {
  displayedColumns: string[] = [
    'check',
    'subject',
    'contactName',
    'status',
    'total',
    'assignedTo',
    'createdTime',
    'updatedTime',
    'modify',
    'delete',
  ];
  statusNames: string[] = ['Created', 'Approved', 'Delivered', 'Canceled'];
  statusFromDashboard!: string;

  createdTimeForm!: FormGroup;
  updatedTimeForm!: FormGroup;
  // status form controls will used for autofill when user click on sales order chart
  // so it need to be globally assigned a value
  status: FormControl = new FormControl('');
  searchText!: FormControl;
  contactName!: FormControl;
  assignedTo!: FormControl;

  user$!: Observable<User>;
  assignedToUsers$!: Observable<User[]>;
  salesOrders$!: Observable<SalesOrder[]>;
  search$!: Observable<SalesOrder[]>;
  result$!: Observable<SalesOrder[]>;
  filterSubject: BehaviorSubject<FilterCriteria> =
    new BehaviorSubject<FilterCriteria>({});

  checkArray: string[] = [];
  isDisabled: boolean = true; // it used to show/hide the mass delete button
  submitted: boolean = false;
  show: boolean = true;
  dataSource: any[] = [];

  constructor(
    private router: Router,
    protected salesOrderService: SalesOrderService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private userService: UserService,
    private authService: AuthService
  ) {
    // clear params (status) before get all data
    this.router.navigateByUrl('/sales-order');
    // get status passed from dashboard page
    this.route.queryParams.subscribe((params) => {
      if (params['status']) {
        this.statusFromDashboard = params['status'];
        this.status = new FormControl(this.statusFromDashboard);
        this.applySelectFilter(this.status.value, 'status');
      }
    });
  }

  ngOnInit() {
    this.init();

    // init created time and updated time form groups
    this.createdTimeForm = this.formBuilder.group(
      {
        createdTimeFrom: new FormControl(Validators.required),
        createdTimeTo: new FormControl(Validators.required),
      },
      { validators: DateRangeValidator('createdTimeFrom', 'createdTimeTo') }
    );

    this.updatedTimeForm = this.formBuilder.group(
      {
        updatedTimeFrom: new FormControl(Validators.required),
        updatedTimeTo: new FormControl(Validators.required),
      },
      { validators: DateRangeValidator('updatedTimeFrom', 'updatedTimeTo') }
    );
  }

  init() {
    this.searchText = new FormControl('');
    this.assignedTo = new FormControl('');

    this.assignedToUsers$ = this.userService.getListOfUsers().pipe(
      tap((data) => {
        if (data.length === 1) {
          this.show = false;
        }
      })
    );

    this.search$ = this.searchText.valueChanges.pipe(
      startWith(''),
      tap((contactName) => {
        // do something if the search keyword need to be handle before passed it to next stage
      }),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((contactName) =>
        contactName
          ? this.salesOrderService.searchSalesOrder(contactName)
          : of(null)
      ),
      map((res) => res && res['data'])
    );

    combineLatest([
      this.salesOrderService.getListOfSalesOrder(),
      this.filterSubject,
      this.search$,
    ])
      .pipe(
        map(
          ([
            salesOrder,
            {
              status,
              assignedTo,
              contactName,
              createdTimeFrom,
              createdTimeTo,
              updatedTimeFrom,
              updatedTimeTo,
            },
            searchResult,
          ]) => {
            const sourceData = searchResult ? searchResult : salesOrder;
            return sourceData.filter((d) => {
              return (
                (status ? d.status === status : true) &&
                (assignedTo ? d.assignedTo === assignedTo : true) &&
                (createdTimeFrom
                  ? moment(d.createdTime).isBefore(createdTimeFrom)
                  : true) &&
                (createdTimeTo
                  ? moment(d.createdTime).isAfter(createdTimeTo)
                  : true) &&
                (updatedTimeFrom
                  ? moment(d.updatedTime).isBefore(updatedTimeFrom)
                  : true) &&
                (updatedTimeTo
                  ? moment(d.updatedTime).isAfter(updatedTimeTo)
                  : true)
              );
            });
          }
        )
      )
      .subscribe((data) => {
        this.dataSource = data;
      });
  }

  // function to reset the table
  reset() {
    this.filterSubject.next({});
    this.init();
    this.status = new FormControl('');
    // reset form groups
    this.createdTimeForm.reset();
    this.updatedTimeForm.reset();
  }

  // navigate to the edit sale order page
  navigateToEdit(saleOrderId: string) {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { id: saleOrderId },
    // };
    // this.router.navigate(['/sales_order/edit'], navigationExtras);
  }

  applySelectFilter(filterValue: string, filterBy: string) {
    const currentFilterObj = this.filterSubject.getValue();
    this.filterSubject.next({ ...currentFilterObj, [filterBy]: filterValue });
  }

  applyDateFilter(dateForm: FormGroup, filterBy: string) {
    this.submitted = true;
    const date = dateForm.value;
    const currentFilterObj = this.filterSubject.getValue();

    if (filterBy == 'createdTime') {
      const dateFrom = moment(date.createdTimeFrom).format('mm/dd/yyyy');
      const dateTo = moment(date.createdTimeTo).format('mm/dd/yyyy');
      this.filterSubject.next({
        ...currentFilterObj,
        ['createdTimeFrom']: dateFrom,
        ['createdTimeTo']: dateTo,
      });
    }
    if (filterBy == 'updatedTime') {
      const dateFrom = moment(date.updatedTimeFrom).format('mm/dd/yyyy');
      const dateTo = moment(date.updatedTimeTo).format('mm/dd/yyyy');
      this.filterSubject.next({
        ...currentFilterObj,
        ['updatedTimeFrom']: dateFrom,
        ['updatedTimeTo']: dateTo,
      });
    }
  }

  onDelete(saleOrderId: string, sub: string) {}

  onCheckboxClicked(e: any) {
    this.isDisabled = false; // enable the Delete button
    if (e.target.checked) {
      // add the checked value to array
      this.checkArray.push(e.target.value);
    } else {
      // remove the unchecked value from array
      this.checkArray.splice(this.checkArray.indexOf(e.target.value), 1);
    }

    // if there is no value in checkArray then disable the Delete button
    if (this.checkArray.length == 0) {
      this.isDisabled = true;
    }
  }

  onMassDeleteBtnClicked() {}

  onClickedRow(salesOrderId: string) {}
}
