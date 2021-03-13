import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../../contacts/services/contact.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { ConfirmationModalComponent } from '../../../shared/confirmation/confirmation-modal.component';
import { IContactResponse } from '../../../components/contacts/models/response/contact-response';

@Component({
  selector: 'app-contact-add-or-edit',
  templateUrl: './contact-add-or-edit.component.html',
  styleUrls: ['./contact-add-or-edit.component.scss']
})
export class ContactAddOrEditComponent implements OnInit {

  /* #region  Variables */
  contractDetailGroup: FormGroup;
  id: number;
  contact: IContactResponse;
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private readonly _location: Location,
    private _modalService: NgbModal,
    private readonly _contactService: ContactService,
    private _notificationService: NotificationService
  ) {
    // u slucaju da promijenimo ID u URL-u
    this._activatedRoute.params.subscribe(parameter => {
      if (parameter?.id) {
        this.id = +parameter.id;
        this._contactService.getById(this.id).subscribe(
          response => this.contact = { ...response }
        )
      }

    })
  }
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void {
    this.setUpFormGroup();
  }

  setUpFormGroup(): void {
    if (this.id) {
      this.contractDetailGroup = this._formBuilder.group({
        id: this.id,
        fullName: [this.contact.fullName, [Validators.required, Validators.pattern("^([a-zA-Z]{2,}\\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)")]],
        email: [this.contact.email, [Validators.required, Validators.email]],
        phones: this._formBuilder.array([])
      });
      this.contact.phones.forEach(el => {
        this.phones.push(
          this._formBuilder.group({
            name: [el.name, Validators.required],
            number: [el.number, Validators.required]
          })
        )
      })
    } else {
      this.contractDetailGroup = this._formBuilder.group({
        fullName: ['', [Validators.required, Validators.pattern("^([a-zA-Z]{2,}\\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)")]],
        email: ['', [Validators.required, Validators.email]],
        phones: this._formBuilder.array([
          this._formBuilder.group({
            number: ['', Validators.required],
            name: ['', Validators.required]
          })
        ])
      })
    }
  }

  newNumber(): void {
    this.phones.push(
      this._formBuilder.group({
        number: ['', Validators.required],
        name: ['', Validators.required]
      })
    );
  }

  removeNumber(i): void {
    if (i === 0) {
      this.phones.controls[i].reset();
    } else {
      this.phones.removeAt(i);
    }
  }

  navigateBack(): void {
    // problem je ako user refresha, onda location ne radi!
    this._location.back();
  }

  deleteEntry(): void {
    const modalRef = this._modalService.open(ConfirmationModalComponent, { centered: true });
    modalRef.componentInstance.title = 'Delete';
    modalRef.componentInstance.description = 'Are you sure you want to delete this contact?';
    modalRef.result.then((result) => {
      this._contactService.deleteEntry(this.id);
      this._notificationService.fireSuccessMessage('Success', 'Contact has been deleted');
      this._location.back();
    }).catch((reason) => {
      this._notificationService.fireWarningMessage('Attention', 'Contact has not been deleted');
    });
  }

  onSubmit(): void {
    if (this.contractDetailGroup.invalid || this.phones.controls.some(x => x.invalid)) {
      // trigger reactive forms submitted property
      return;
    }
    // if (this.contractDetailGroup.dirty || this.phones.dirty) {
    if (this.id) this._contactService.edit(this.contractDetailGroup.value)
    else this._contactService.add(this.contractDetailGroup.value)
    this.navigateBack();
    // } else {
    //   this._notificationService.fireWarningMessage('Attention', 'Contact fields are not edited');
    // }
  }
  /* #endregion */


  /* #region  Abstract controls */
  get fullName(): AbstractControl | null { return this.contractDetailGroup.get('fullName'); }
  get email(): AbstractControl | null { return this.contractDetailGroup.get('email'); }
  get phones(): FormArray | null { return this.contractDetailGroup.get('phones') as FormArray; }
  get number() { return (i: number): AbstractControl => { return this.phones.controls[i].get('number') as AbstractControl; } }
  get name() { return (i: number): AbstractControl => { return this.phones.controls[i].get('name') as AbstractControl; } }
  /* #endregion */
}
