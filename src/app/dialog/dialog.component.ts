import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'add-app-dialog',
  template: `
  <h1 mat-dialog-title>Add application</h1>
  <div mat-dialog-content>
    <p>What the app name?</p>
    <mat-form-field>
      <input matInput [(ngModel)]="name">
    </mat-form-field>
    <p>What the app src?</p>
    <mat-form-field>
      <input matInput [(ngModel)]="src">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="dialogRef.close()">Close</button>
    <button mat-button (click)="addApp()" cdkFocusInitial>Add</button>
  </div>
  `
})
export class DialogComponent {
  public name: string;
  public src: string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    public applicationService: ApplicationService) {}

  addApp(): void {
    if (this.name && this.src) {
      this.applicationService.addApp(this.name, this.src);
    }
    this.dialogRef.close();
  }
}