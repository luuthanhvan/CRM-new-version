import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '~core/services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss',
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class ProgressSpinnerComponent {
  constructor(protected loadingService: LoadingService) {}
}
