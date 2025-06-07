import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ContactService } from '~features/contact/services/contact.service';
import { Contact } from '~features/contact/types/contact.type';

@Component({
  selector: 'app-contact-details',
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
})
export class ContactDetailsComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ContactDetailsComponent>);
  private contactService = inject(ContactService);
  data = inject(MAT_DIALOG_DATA);
  contact!: Contact;

  ngOnInit(): void {
    if (this.data && this.data.contactId) {
      this.contactService
        .getContact(
          this.data.contactId,
          [],
          [{ name: 'skipLoading', value: 'true' }]
        )
        .subscribe((data) => {
          this.contact = data;
        });
    }
  }
}
