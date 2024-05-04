import { Component, Input } from '@angular/core';

interface IPopularCourse {
  id: number;
  teacher: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-carrusel-bg-img',
  standalone: true,
  imports: [],
  templateUrl: './carrusel-bg-img.component.html',
  styleUrl: './carrusel-bg-img.component.css'
})
export class CarruselBgImgComponent {

  @Input({ required: true }) public courses!: IPopularCourse[]
}
