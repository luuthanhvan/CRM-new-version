import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule, TranslateModule, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit{
  @Input() title: string = '';

  ngOnInit(): void {
    
  }
}
