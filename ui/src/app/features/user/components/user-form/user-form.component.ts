import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '~core/services/toast.service';
import { MustMatch } from '~core/validators/common.validator';
import { UserService } from '~features/user/services/user.service';
import { LoadingService } from '~core/services/loading.service';
import type { User } from '~features/user/types/user.type';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButton,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UserFormComponent>);
  private formBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);
  private loadingService = inject(LoadingService);
  private userService = inject(UserService);

  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ]),
        isAdmin: new FormControl(false),
        isActive: new FormControl(false),
      },
      {
        validators: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  onSubmit() {
    const userInfo: User = {
      name: this.userForm.controls['name'].value,
      username: this.userForm.controls['username'].value,
      password: this.userForm.controls['password'].value,
      email: this.userForm.controls['email'].value,
      phone: this.userForm.controls['phone'].value,
      isAdmin: this.userForm.controls['isAdmin'].value,
      isActive: this.userForm.controls['isActive'].value,
    };
    this.loadingService.showLoading();
    this.userService
      .createUser(userInfo)
      .pipe(
        tap((res) => {
          this.loadingService.hideLoading();
          if (res['status'] === 1) {
            this.toastService.showSuccessMessage('Success to add a new user!');
            this.dialogRef.close();
          } else {
            this.toastService.showErrorMessage('Failed to add a new user!');
          }
        })
      )
      .subscribe();
  }
}
