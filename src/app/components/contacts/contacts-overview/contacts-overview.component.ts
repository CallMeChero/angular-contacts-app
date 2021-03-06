import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ContactService } from 'src/app/components/contacts/services/contact.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IContactResponse } from 'src/app/components/contacts/models/response/contact-response';

@Component({
  selector: 'app-contacts-overview',
  templateUrl: './contacts-overview.component.html',
  styleUrls: ['./contacts-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsOverviewComponent implements OnInit {

  // declarative pattern
  contacts$: Observable<IContactResponse[]>;
  contactsSubject$: Subject<boolean> = new Subject();

  constructor(
    private readonly _contactService: ContactService,
    private readonly _notificationService: NotificationService
  ) {
    this.contactsSubject$.subscribe(res => {
      this.contacts$ = this._contactService.contacts$.pipe(
        tap(data => console.log(data)),
        catchError(err => {
          this._notificationService.fireErrorNotification("Greška", err);
          return EMPTY;
        })
      );
    });
  }

  ngOnInit(): void {
    this.contactsSubject$.next(true);
  }

}
