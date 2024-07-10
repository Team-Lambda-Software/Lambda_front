import { Component, EventEmitter, inject, input, Input, Output, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { TrainerDetail } from '../../../../../../core/trainer/domain/trainer.model';
import { TrainerFollowToggleProvider } from '../../../../../../core/trainer/infrastructure/providers/trainer-follow-toggle-use-case';
import { SquareSkeletonComponent } from '../../../../../shared/components/square-skeleton/square-skeleton.component';
import { CircleSkeletonComponent } from '../../../../../shared/components/circle-skeleton/circle-skeleton.component';

@Component({
  selector: 'app-trainer-detail',
  standalone: true,
  imports: [
    TranslocoModule,
    SquareSkeletonComponent,
    CircleSkeletonComponent
  ],
  templateUrl: './trainer-detail.component.html',
  styleUrl: './trainer-detail.component.css'
})
export class TrainerDetailComponent {

  @Output() public onTrainerToggleFollow = new EventEmitter<void>();
  private trainerFollowToggleProvider = inject(TrainerFollowToggleProvider);
  public trainerDetail = input.required<TrainerDetail | null>();
  public isLoading = signal(false);

  onToggleFollow() {
    const prevValue = this.trainerDetail()!.userFollow;
    this.isLoading.set(true);
    this.trainerFollowToggleProvider.usecase.execute(this.trainerDetail()!.id)
      .subscribe( (response) => {
        this.isLoading.set(false);
        this.onTrainerToggleFollow.emit();
      });
  }
}
