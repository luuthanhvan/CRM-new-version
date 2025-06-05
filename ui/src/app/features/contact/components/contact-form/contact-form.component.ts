import { Component, OnInit, inject } from '@angular/core';
import { tap } from 'rxjs/operators';
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
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastService } from '~core/services/toast.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from '~features/contact/services/contact.service';
import type { Contact } from '~features/contact/types/contact.type';
import type { User } from '~features/user/types/user.type';
import { UserService } from '~features/user/services/user.service';

@Component({
  selector: 'app-contact-form',
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ContactFormComponent>);
  private formBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);
  private contactService = inject(ContactService);
  private userService = inject(UserService);
  data = inject(MAT_DIALOG_DATA);
  salutations: string[] = ['None', 'Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'];
  leadSources: string[] = [
    'Existing Customer',
    'Partner',
    'Conference',
    'Website',
    'Word of mouth',
    'Other',
  ];
  contactForm!: FormGroup;
  assignedToUsers!: User[];
  // retain created time when editing Sales order
  createdTime = new Date();

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      contactName: new FormControl('', [Validators.required]),
      salutation: new FormControl('', [Validators.required]),
      mobilePhone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      email: new FormControl('', [Validators.email]),
      organization: new FormControl(''),
      dob: new FormControl(''),
      leadSrc: new FormControl('', [Validators.required]),
      assignedTo: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      description: new FormControl(''),
    });

    this.userService
      .getListOfUserNames([], [{ name: 'skipLoading', value: 'true' }])
      .subscribe((data) => {
        this.assignedToUsers = data || [];
      });

    if (this.data && this.data.action === 'edit') {
      this.getContactById();
    }
  }

  getContactById() {
    this.contactService
      .getContact(
        this.data.contactId,
        [],
        [{ name: 'skipLoading', value: 'true' }]
      )
      .subscribe((data) => {
        this.setFormData(data);
      });
  }

  setFormData(data: Contact) {
    this.contactForm.controls['contactName'].setValue(
      data['contactName'] || ''
    );
    this.contactForm.controls['salutation'].setValue(data['salutation'] || '');
    this.contactForm.controls['mobilePhone'].setValue(
      data['mobilePhone'] || ''
    );
    this.contactForm.controls['email'].setValue(data['email'] || '');
    this.contactForm.controls['organization'].setValue(
      data['organization'] || ''
    );
    this.contactForm.controls['dob'].setValue(data['dob'] || '');
    this.contactForm.controls['leadSrc'].setValue(data['leadSrc'] || '');
    this.contactForm.controls['assignedTo'].setValue(data['assignedTo'] || '');
    this.contactForm.controls['address'].setValue(data['address'] || '');
    this.contactForm.controls['description'].setValue(
      data['description'] || ''
    );
    this.createdTime = data['createdTime'] || new Date();
  }

  onSubmit() {
    const currentUserInfo = window.localStorage.getItem('currentUser');
    const contactInfo: Contact = {
      contactName: this.contactForm.controls['contactName'].value,
      salutation: this.contactForm.controls['salutation'].value,
      mobilePhone: this.contactForm.controls['mobilePhone'].value,
      email: this.contactForm.controls['email'].value,
      organization: this.contactForm.controls['organization'].value,
      dob: this.contactForm.controls['dob'].value,
      leadSrc: this.contactForm.controls['leadSrc'].value,
      assignedTo: this.contactForm.controls['assignedTo'].value,
      address: this.contactForm.controls['address'].value,
      description: this.contactForm.controls['description'].value,
      creator: currentUserInfo && (JSON.parse(currentUserInfo).name || ''),
      createdTime:
        this.data && this.data.action === 'add' ? new Date() : this.createdTime,
      updatedTime: new Date(),
    };
    if (this.data.action === 'add') {
      this.contactService
        .addContact(contactInfo)
        .pipe(
          tap((res) => {
            if (res['status'] === 1) {
              this.toastService.showSuccessMessage('Add new Contact!');
              this.dialogRef.close();
            } else {
              this.toastService.showErrorMessage('Add new Contact!');
            }
          })
        )
        .subscribe();
    } else {
      this.contactService
        .updateContact(this.data.contactId, contactInfo)
        .pipe(
          tap((res) => {
            if (res['status'] === 1) {
              this.toastService.showSuccessMessage('Update the Contact!');
              this.dialogRef.close();
            } else {
              this.toastService.showErrorMessage('Update the Contact!');
            }
          })
        )
        .subscribe();
    }
  }
}
