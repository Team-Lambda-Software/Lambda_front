import { Component, Input } from '@angular/core';
import { BasicHeaderNotificationComponent } from '../basic-header-notification/basic-header-notification.component';
import { RouterLink, Router } from '@angular/router';
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
  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog(st: Notification): void {
    const dialogRef = this.dialog.open(StructureDetailComponent, {
      width: '250px',
      data: st 
    });
  
    dialogRef.afterClosed().subscribe(() => {
      st.userReaded = false;
      this.router.navigate([this.router.url]);
    });
  }
}