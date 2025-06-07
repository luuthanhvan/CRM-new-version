import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-no-data-found',
  imports: [CommonModule, TranslateModule, MatIconModule],
  templateUrl: './no-data-found.component.html',
  styleUrl: './no-data-found.component.scss',
})
export class NoDataFoundComponent {}
