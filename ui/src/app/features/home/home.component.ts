import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProgressSpinnerComponent } from '~core/components/progress-spinner/progress-spinner.component';
import { AuthService } from '~features/authentication/services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    ProgressSpinnerComponent,
    RouterOutlet,
    CommonModule,
    TranslateModule,
    MatButton,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
  ],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  isBrowserRefresh: boolean = false;
  isAdminUser: boolean = false;

  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    // Set included languages
    this.translate.addLangs(['en', 'vi']);
    const browserLang = navigator.languages
      ? navigator.languages[0].split('-')[0]
      : navigator.language.split('-')[0];

    // Get the current browser language, if included set it
    const defaultLang = this.translate.getLangs().includes(browserLang)
      ? browserLang
      : 'en';

    // Set the default and current language
    this.translate.setDefaultLang(defaultLang);
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.me().subscribe((data) => {
        this.currentUser = data;
        this.isAdminUser = this.currentUser.isAdmin;
        window.localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      });
    }
  }

  openChangePwdDialog() {}

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  signout() {
    this.authService.removeToken();
    window.localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
