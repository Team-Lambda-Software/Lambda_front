import { Component, Input } from '@angular/core';
import { ICard } from '../../interfaces/ILittleCard';

@Component({
  selector: 'app-big-card',
  standalone: true,
  imports: [],
  templateUrl: './big-card.component.html',
  styleUrl: './big-card.component.css'
})
export class BigCardComponent {

  @Input({ required: true }) public item!: ICard;
}
