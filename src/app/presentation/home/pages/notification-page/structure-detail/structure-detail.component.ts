import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from '../../../../../core/notification/domain/notification.model';
@Component({
  selector: 'app-structure-detail',
  standalone: true,
  imports: [],
  templateUrl: './structure-detail.component.html',
  styleUrl: './structure-detail.component.css'
})
export class StructureDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<StructureDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notification
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
