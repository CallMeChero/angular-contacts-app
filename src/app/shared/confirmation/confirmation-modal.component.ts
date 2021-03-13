import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  /* #region  Variables */
  @Input() title!: string;
  @Input() description!: string;
  /* #endregion */

  /* #region  Constructor */
  constructor(config: NgbModalConfig, public modal: NgbActiveModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void { }
  /* #endregion */
}
