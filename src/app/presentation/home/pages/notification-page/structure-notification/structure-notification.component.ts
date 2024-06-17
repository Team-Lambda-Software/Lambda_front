import { Component, Input } from '@angular/core';
import { BasicHeaderNotificationComponent } from '../../../components/basic-header-notification/basic-header-notification.component';
import { RouterLink } from '@angular/router';
import { Notification } from '../../../../../core/notification/domain/notification.model';
import { MatDialog } from '@angular/material/dialog';
import { StructureDetailComponent } from '../structure-detail/structure-detail.component';

@Component({
  selector: 'app-structure-notification',
  standalone: true,
  imports: [BasicHeaderNotificationComponent,RouterLink,StructureDetailComponent],
  templateUrl: './structure-notification.component.html',
  styleUrl: './structure-notification.component.css'
})

export class StructureNotificationComponent {
  @Input({required:true})
  public structure: Notification[] = [];
  constructor(public dialog: MatDialog) {}

openDialog(st: any): void {
  this.dialog.open(StructureDetailComponent, {
    width: '250px',
    data: st
  });
  

  } 
}