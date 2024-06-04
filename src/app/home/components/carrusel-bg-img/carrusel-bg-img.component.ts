import { Component, Input } from '@angular/core';
import { LitleCardComponent } from '../litle-card/litle-card.component';
import { ILittleCard } from '../../interfaces/ILittleCard';

@Component({
  selector: 'app-carrusel-bg-img',
  standalone: true,
  imports: [LitleCardComponent],
  templateUrl: './carrusel-bg-img.component.html',
  styleUrl: './carrusel-bg-img.component.css'
})
export class CarruselBgImgComponent {

  @Input({ required: true }) public items!: ILittleCard[]
}
