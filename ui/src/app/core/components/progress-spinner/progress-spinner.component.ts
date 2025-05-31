import { Component } from '@angular/core';
import { LoadingService } from '~core/services/loading.service';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss',
})
export class ProgressSpinnerComponent {
  constructor(protected loadingService: LoadingService) {}
}
