import { Component, Input } from '@angular/core';


interface ICourse {
  id: number;
  name: string;
  category: string;
  date: string;
  image: string;
}

@Component({
  selector: 'app-card-carrusel',
  standalone: true,
  imports: [],
  templateUrl: './card-carrusel.component.html',
  styleUrl: './card-carrusel.component.css'
})
export class CardCarruselComponent {
  
  @Input({required: true}) public courses!: ICourse[];
}
