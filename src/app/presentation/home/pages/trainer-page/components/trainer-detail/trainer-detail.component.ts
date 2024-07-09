import { Component, input, Input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { TrainerDetail } from '../../../../../../core/trainer/domain/trainer.model';

@Component({
  selector: 'app-trainer-detail',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './trainer-detail.component.html',
  styleUrl: './trainer-detail.component.css'
})
export class TrainerDetailComponent {
  public trainerDetail = input.required<TrainerDetail>();
}
