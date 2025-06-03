import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import type { User } from '~features/user/types/user.type';
import { UserService } from '~features/user/services/user.service';
import { UserFormComponent } from '~features/user/components/user-form/user-form.component';

@Component({
  selector: 'app-user',
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButton,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  @ViewChild(MatPaginator) userPaginator!: MatPaginator;
  private userService = inject(UserService);
  readonly dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<User>([]);
  totalRecords: number = 0;
  displayedColumns: string[] = [
    'name',
    'email',
    'isAdmin',
    'isActive',
    'createdTime',
    // 'modify',
  ];

  constructor() {
    this.dataSource.paginator = this.userPaginator;
  }

  ngOnInit(): void {
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
      this.userService.getListOfUsers(reqParams).subscribe((data) => {
        this.totalRecords = data.length;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.userPaginator;
      });
    }
  }

  openUserDialog(action: string, userId?: string) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      disableClose: true,
      width: '900px',
      data: {
        action,
        userId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // reload list of users after close the dialog
      this.loadData();
    });
  }
}
