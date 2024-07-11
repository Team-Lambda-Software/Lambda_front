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
  public ramdonImage = this.getRamdonImage();
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

  getRamdonImage(): string {
    // TA' CHIMBO, PERO QUÉ LE VAMOS A HACER, ESTO SE ENTREGA MAÑANA
    return [
      'https://cdnb.artstation.com/p/assets/images/images/033/885/779/large/caio-fernandes-1288b8b9-187d-4812-a73f-1dd14c9bb8d3.jpg?1610822483',
      'https://ginastic-center.web.app/assets/images/no-profile-img.jpg',
      'https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150517171.jpg',
      'https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503812.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720569600&semt=ais_hybrid',
      'https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503834.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720569600&semt=ais_hybrid',
      'https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503847.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720569600&semt=ais_hybrid',
      'https://cdn.dribbble.com/users/8309782/screenshots/17981401/media/5772ee39311b670f8ffe00052b4e48e3.jpg?resize=400x0',
      'https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg',
      'https://img.freepik.com/premium-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503791.jpg',
      'https://img.freepik.com/premium-vector/young-man-avatar-cartoon-character-profile-picture_18591-55055.jpg',
      'https://img.freepik.com/premium-vector/young-man-avatar-cartoon-character-profile-picture_18591-55058.jpg?w=360',
      'https://img.freepik.com/premium-vector/young-woman-avatar-cartoon-character-profile-picture_18591-55054.jpg'

    ].at(Math.floor(Math.random() * 12))!
  }
}
