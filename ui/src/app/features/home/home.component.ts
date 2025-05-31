import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  currentUser: any;
  isBrowserRefresh: boolean = false;
  isAdminUser: boolean = false;

  constructor (public translate: TranslateService) {
    translate.addLangs(["en", "vi"]); // tells the service which languages are available to use for translations.
    translate.setDefaultLang("en"); // specify a fallback set of translations to use in case there are missing translations for the current language.
  }

  ngOnInit(): void {
    
  }

  openChangePwdDialog() {}

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
