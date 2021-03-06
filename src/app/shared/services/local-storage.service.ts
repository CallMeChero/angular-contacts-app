import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /* #region  Variables */
  localStorage: Storage;
  /* #endregion */

  /* #region  Constructor */
  constructor() {
    this.localStorage = window.localStorage;
  }
  /* #endregion */

  /* #region  Public methods */

  get(key: string): any {
    return JSON.parse(this.localStorage.getItem(key)) || null;
  }

  set(key: string, value: any): boolean {
    this.localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  remove(key: string): boolean {
    this.localStorage.removeItem(key);
    return true;
  }

  /* #endregion */
}
