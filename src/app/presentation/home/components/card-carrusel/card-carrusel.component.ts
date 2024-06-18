import { Component, Input } from '@angular/core';
import { BigCardComponent } from '../big-card/big-card.component';
import { ICard } from '../../interfaces/ILittleCard';

@Component({
  selector: 'app-card-carrusel',
  standalone: true,
  imports: [BigCardComponent],
  templateUrl: './card-carrusel.component.html',
  styleUrl: './card-carrusel.component.css'
})
export class CardCarruselComponent {
  
  @Input({required: true}) public items!: ICard[];
  @Input({required: true}) public routerLink!: string;

}
