import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IContactResponse } from 'src/app/components/contacts/models/response/contact-response';

@Injectable({
  providedIn: 'any',
})
export class ContactService {

  /* #region  Variables */
  loader: NgxSpinnerService;
  // declarative approach
  contacts$ = of<[IContactResponse[]]>([JSON.parse(localStorage.getItem('contacts'))]).pipe(
    map(res => res[0] as IContactResponse[]),
    tap(res => console.log("Get all contacts", res)),
    catchError(error => this.handleError(error))
  );
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private _ngxSpinnerService: NgxSpinnerService
  ) {
    this.loader = this._ngxSpinnerService;
  }
  /* #endregion */

  private handleError(err: any, loader?: NgxSpinnerService): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = err.error.errorMessage;
    }
    if (loader) loader.hide();
    return throwError(errorMessage);
  }
  /* #endregion */
}
