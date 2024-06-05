import { Component, Input } from '@angular/core';
import { RouterLink  } from '@angular/router';
import { ICard } from '../../interfaces/ILittleCard';

@Component({
  selector: 'app-big-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './big-card.component.html',
  styleUrl: './big-card.component.css'
})
export class BigCardComponent {

  @Input({ required: true }) public item!: ICard;
}
