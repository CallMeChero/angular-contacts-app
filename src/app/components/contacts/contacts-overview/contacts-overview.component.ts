import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ContactService } from 'src/app/components/contacts/services/contact.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IContactResponse } from 'src/app/components/contacts/models/response/contact-response';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation/confirmation-modal.component';

@Component({
  selector: 'app-contacts-overview',
  templateUrl: './contacts-overview.component.html',
  styleUrls: ['./contacts-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ContactService] //need to make singleton due to declarative API approach
})
export class ContactsOverviewComponent implements OnInit {

  /* #region  Variables */
  // declarative pattern
  contacts$: Observable<IContactResponse[]>;
  contactsSubject$: Subject<boolean> = new Subject();
  isFavorites: boolean = false;
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _contactService: ContactService,
    private readonly _notificationService: NotificationService,
    private readonly _router: Router,
    private _modalService: NgbModal,
    private _activatedRoute: ActivatedRoute
  ) {
    this.contactsSubject$.subscribe(res => {
      this.contacts$ = this._contactService.contacts$.pipe(
        tap(data => console.log("PODACI", data)),
        map(res => this.isFavorites ? res.filter(item => item.isFavorite === true) : res),
        catchError(err => {
          this._notificationService.fireErrorNotification("Error", err);
          return EMPTY;
        })
      );
    });
    this._activatedRoute.data.subscribe(data => {
      this.isFavorites = data.isFavorites;
    })
  }
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void {
    this.contactsSubject$.next(true);
  }

  deleteEntry(id: number): void {
    const modalRef = this._modalService.open(ConfirmationModalComponent, { centered: true });
    modalRef.componentInstance.title = 'Delete';
    modalRef.componentInstance.description = 'Are you sure you want to delete this contact?';
    modalRef.result.then((result) => {
      this._contactService.deleteEntry(id);
      this._notificationService.fireSuccessMessage('Success', 'Contact has been deleted')
    }).catch((reason) => {
      this._notificationService.fireWarningMessage('Attention', 'Contact has not been deleted')
    });
  }

  onImgError(event): void {
    event.target.src = 'assets/images/contacts/cartman.jpg'
  }

  navigateToDetail(isEdit: boolean, id?: IContactResponse): void {
    if (isEdit && id) {
      this._router.navigate(['contact', id]);
    } else if (id) {
      this._router.navigate(['detail', id]);
    } else {
      this._router.navigate(['contact/new']);
    }
  }
  /* #endregion */

}
