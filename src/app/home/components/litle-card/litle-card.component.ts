import { Component, Input } from '@angular/core';
import { ILittleCard } from '../../interfaces/ILittleCard';

@Component({
  selector: 'app-litle-card',
  standalone: true,
  imports: [],
  templateUrl: './litle-card.component.html',
  styleUrl: './litle-card.component.css'
})
export class LitleCardComponent {

  @Input({ required: true }) public item!: ILittleCard;
}
