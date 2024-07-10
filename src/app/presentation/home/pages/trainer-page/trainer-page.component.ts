import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { TrainerGetByIdProvider } from '../../../../core/trainer/infrastructure/providers/trainer-get-by-id-use-case';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrainerDetail } from '../../../../core/trainer/domain/trainer.model';
import { BasicHeaderComponent } from '../../components/basic-header/basic-header.component';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { TrainerDetailComponent } from './components/trainer-detail/trainer-detail.component';
import { TrainerCoursesComponent } from './components/trainer-courses/trainer-courses.component';
import { TrainerBlogsComponent } from './components/trainer-blogs/trainer-blogs.component';

@Component({
  selector: 'app-trainer-page',
  standalone: true,
  imports: [
    BasicHeaderComponent,
    TrainerDetailComponent,
    TrainerCoursesComponent,
    TrainerBlogsComponent
  ],
  templateUrl: './trainer-page.component.html',
  styleUrl: './trainer-page.component.css'
})
export class TrainerPageComponent implements OnInit {

  @Input('id')
  public trainerId?: string;
  public trainerGetByIdProvider = inject(TrainerGetByIdProvider);
  public router = inject(Router);
  public snackBar = inject(MatSnackBar);
  public trainerDetail = signal<TrainerDetail | null>(null);

  ngOnInit(): void {
    if (!this.trainerId) this.router.navigate(['/home']);
    else {
      this.getTrainerInfo();
    }
  }

  getTrainerInfo() {
    this.trainerGetByIdProvider.usecase.execute(this.trainerId!)
      .subscribe((result) => {
        if (result.isError()) {
          this.snackBar.open(result.getError().message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        } else {
          this.trainerDetail.set(result.getValue());
        }
      })
  }

  onTrainerToggleFollow(_$event: void) {
    const trainer = this.trainerDetail()!;
    const updatedUserFollow = !trainer.userFollow
    const updatedFollowers = updatedUserFollow ? trainer.followers + 1 : trainer.followers - 1;
    this.trainerDetail.set({ ...trainer, userFollow: updatedUserFollow, followers: updatedFollowers });
  }

}
