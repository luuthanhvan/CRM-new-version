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
  ],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  isBrowserRefresh: boolean = false;
  isAdminUser: boolean = false;

  constructor(public translate: TranslateService) {
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
    // translate.addLangs(['en', 'vi']); // tells the service which languages are available to use for translations.
    // translate.setDefaultLang('en'); // specify a fallback set of translations to use in case there are missing translations for the current language.
  }

  ngOnInit(): void {}

  openChangePwdDialog() {}

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  signout() {}
}
