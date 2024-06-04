import { Component, Input } from '@angular/core';
import { IPlayerCard } from '../../interfaces/IPlayerCard';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css'
})
export class PlayerCardComponent {

  @Input() item!: IPlayerCard;
}
