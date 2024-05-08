import { Component, Input } from '@angular/core';
import { ICard } from '../../interfaces/ILittleCard';

@Component({
  selector: 'app-card-carrusel',
  standalone: true,
  imports: [],
  templateUrl: './card-carrusel.component.html',
  styleUrl: './card-carrusel.component.css'
})
export class CardCarruselComponent {
  
  @Input({required: true}) public courses!: ICard[];
}
