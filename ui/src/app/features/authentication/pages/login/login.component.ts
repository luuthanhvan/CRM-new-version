import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '~features/authentication/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { ToastService } from '~core/services/toast.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButton,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);
  loginForm!: FormGroup;
  submitted: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    let userInfo = form.value;
    this.authService.login(userInfo.username, userInfo.password).subscribe({
      next: (res) => {
        this.authService.setToken(res['data']);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.toastService.showErrorMessage(err.error['message'].message);
      },
    });
  }
}
