import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../../contacts/services/contact.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IContactResponse } from '../../contacts/models/response/contact-response';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {

  /* #region  Variables */
  id: number;
  contact: IContactResponse;
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _location: Location,
    private _modalService: NgbModal,
    private _router: Router,
    private readonly _contactService: ContactService,
    private _notificationService: NotificationService
  ) {
    // u slucaju da promijenimo ID u URL-u
    this._activatedRoute.params.subscribe(parameter => {
      this.id = +parameter.id;
      this._contactService.getById(this.id).subscribe(
        response => { this.contact = { ...response }; console.log(this.contact) }
      )
    })
  }
  /* #endregion */

  /* #region  Methods */
  navigateBack(): void {
    // problem je ako user refresha, onda location ne radi!
    this._location.back();
  }

  navigateToDetail(): void {
    this._router.navigate(['contact', this.id]);
  }

  setAsFavourite(): void {
    this.contact.isFavorite = !this.contact.isFavorite;
    this._contactService.edit(this.contact);
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

  onImgError(event): void {
    event.target.src = 'assets/images/contacts/cartman.jpg'
  }
  /* #endregion */
}
