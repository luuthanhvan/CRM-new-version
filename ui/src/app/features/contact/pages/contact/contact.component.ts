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
import { ToastService } from '~core/services/toast.service';
import { ContactService } from '~features/contact/services/contact.service';
import type { Contact } from '~features/contact/types/contact.type';
import moment from 'moment';
import { ContactFormComponent } from '~features/contact/components/contact-form/contact-form.component';
import { DialogComponent } from '~core/components/dialog/dialog.component';
import { ContactDetailsComponent } from '~features/contact/components/contact-details/contact-details.component';

@Component({
  selector: 'app-contact',
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
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  @ViewChild(MatPaginator) contactPaginator!: MatPaginator;
  displayedColumns: string[] = [
    'check',
    'contactName',
    'salutation',
    'leadSrc',
    'assignedTo',
    'createdTime',
    'updatedTime',
    'actions',
  ];

  leadSources: string[] = [
    'Existing Customer',
    'Partner',
    'Conference',
    'Website',
    'Word of mouth',
    'Other',
  ];
  isDisabled: boolean = true;
  dataSource = new MatTableDataSource<Contact>([]);
  totalRecords: number = 0;

  constructor(
    private router: Router,
    protected contactService: ContactService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    // clear params (leadSrc or assignedTo) before get all data
    this.router.navigateByUrl('/contact');
    // get lead source passed from dashboard page
    this.route.queryParams.subscribe((params) => {
      if (params) {
        if (params['leadSrc']) {
          // this.leadSrcFromDashboard = params['leadSrc'];
          // this.leadSrc = new FormControl(this.leadSrcFromDashboard);
        }
        if (params['assignedTo']) {
          // this.assignedFromDashboard = params['assignedTo'];
          // this.assignedTo = new FormControl(this.assignedFromDashboard);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.contactService.getListOfContacts().subscribe((data) => {
      this.totalRecords = data.length;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.contactPaginator;
    });
  }

  openFormDialog(action: string, contactId?: string) {
    const formDialogRef = this.dialog.open(ContactFormComponent, {
      disableClose: true,
      width: '1200px',
      data: {
        action,
        contactId,
      },
    });
    formDialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  openContactDetailsDialog(contactId: string) {
    const contactDetailsDialogRef = this.dialog.open(ContactDetailsComponent, {
      disableClose: true,
      width: '600px',
      data: {
        contactId,
      },
    });
    contactDetailsDialogRef.afterClosed().subscribe((result) => {});
  }

  onDelete(contactId: string, contactName: string) {
    const confirmDialogRef = this.dialog.open(DialogComponent, {
      disableClose: false,
    });
    confirmDialogRef.componentInstance.content = `You want to delete the "${contactName}"?`;
    confirmDialogRef.componentInstance.sendingSubmitSignal.subscribe(
      (signal) => {
        if (signal) {
          this.contactService
            .deleteContact(
              contactId,
              [],
              [{ name: 'skipLoading', value: 'true' }]
            )
            .pipe(
              tap((res) => {
                if (res['status'] === 1) {
                  this.toastService.showSuccessMessage('Delete the Contact!');
                } else {
                  this.toastService.showErrorMessage('Delete the Contact!');
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
