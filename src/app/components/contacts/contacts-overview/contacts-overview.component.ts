import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EMPTY, fromEvent, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
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
export class ContactsOverviewComponent implements OnInit, AfterViewInit {

  /* #region  Variables */
  // declarative pattern
  contacts$: Observable<IContactResponse[]>;
  contactsSubject$: Subject<boolean> = new Subject();
  isFavorites: boolean = false;
  @ViewChild('search') searchInput;
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _contactService: ContactService,
    private readonly _notificationService: NotificationService,
    private readonly _router: Router,
    private _modalService: NgbModal,
    private _activatedRoute: ActivatedRoute,
    private _ref: ChangeDetectorRef
  ) {
    this.contactsSubject$.subscribe(res => {
      this._ref.markForCheck();
      this.contacts$ = this._contactService.contacts$.pipe(
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

  ngAfterViewInit(): void {
    this.setUpFilter();
  }

  deleteEntry(id: number): void {
    const modalRef = this._modalService.open(ConfirmationModalComponent, { centered: true });
    modalRef.componentInstance.title = 'Delete';
    modalRef.componentInstance.description = 'Are you sure you want to delete this contact?';
    modalRef.result.then((result) => {
      this.contacts$ = this._contactService.deleteEntry(id);
      this._ref.markForCheck();
      this._notificationService.fireSuccessMessage('Success', 'Contact has been deleted');
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

  trackByFn(index: number, item: IContactResponse) {
    return item.id;
  }

  setUpFilter() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(
        (data: HTMLInputElement) => {
          let searchTerm = data['target'].value;
          let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
          const keys = Object.keys(contacts[0]);
          let colsAmt = 4;
          let filteredContacts: IContactResponse[] = contacts.filter(item => {
            for (let i = 0; i < colsAmt; i++) {
              if (item[keys[i]] != null && item[keys[i]].toString().toLowerCase().indexOf(searchTerm) !== -1 || !searchTerm) {
                return true;
              }
            }
          });
          this.contacts$ = of(filteredContacts);
          this._ref.markForCheck();
        }
      )
  }
  /* #endregion */

}
