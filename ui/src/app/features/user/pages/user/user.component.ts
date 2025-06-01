import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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
import { MatTableModule } from '@angular/material/table';
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
    MatTableModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  private userService = inject(UserService);
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = [
    'name',
    'email',
    'isAdmin',
    'isActive',
    'createdTime',
    'modify',
  ];
  dataSource: User[] = [];

  constructor() {}

  ngOnInit(): void {
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
        this.dataSource = data;
      });
    }
  }

  openUserDialog() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
