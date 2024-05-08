import { Component, Input } from '@angular/core';
import { ILittleCard } from '../../interfaces/ILittleCard';

@Component({
  selector: 'app-carrusel-bg-img',
  standalone: true,
  imports: [],
  templateUrl: './carrusel-bg-img.component.html',
  styleUrl: './carrusel-bg-img.component.css'
})
export class CarruselBgImgComponent {

  @Input({ required: true }) public items!: ILittleCard[]
}
