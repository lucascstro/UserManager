import { Component, Inject } from '@angular/core';
import { Users } from '../../../interfaces/users';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-view-user',
  templateUrl: './modal-view-user.component.html',
  styleUrl: './modal-view-user.component.scss',
})
export class ModalViewUserComponent {
  userData?: Users;

  constructor(
    public dialogRef: MatDialogRef<ModalViewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.userData = data;
    console.log('Dados do usuário', this.userData);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
