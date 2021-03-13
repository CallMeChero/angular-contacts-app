import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { IContactResponse } from 'src/app/components/contacts/models/response/contact-response';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  /* #region  Variables */
  // declarative approach
  contacts$ = of<[IContactResponse[]]>([JSON.parse(localStorage.getItem('contacts'))]).pipe(
    map(res => res[0] as IContactResponse[]),
    tap(res => console.log("Get all contacts", res)),
    catchError(this.handleError)
  );
  /* #endregion */

  /* #region  Constructor */
  constructor() { }
  /* #endregion */

  add(contact: IContactResponse): void {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts = [...contacts, { ...contact, id: Math.floor(Math.random() * (999)) }];
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  edit(contact: IContactResponse): void {
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    const index = contacts.findIndex(el => el.id === contact.id);
    contacts[index] = contact;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  getById(id: number): Observable<IContactResponse> {
    return this.contacts$.pipe(
      first(),
      map(response => {
        return response.find(x => x.id === id)
      }),
      catchError(this.handleError)
    );
  }

  deleteEntry(id: number): Observable<IContactResponse[]> {
    // ovo bi mogao biti one-liner ali bi bilo nečitljivo
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    return of(contacts)
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = err.error.errorMessage;
    }
    return throwError(errorMessage);
  }
  /* #endregion */
}
