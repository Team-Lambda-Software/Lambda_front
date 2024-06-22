import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-carrousel',
  standalone: true,
  imports: [],
  templateUrl: './img-carrousel.component.html',
  styleUrl: './img-carrousel.component.css'
})
export class ImgCarrouselComponent {
  @Input({required: true}) images: string[] = [];
  public currentIndexImage = 0;

  onScroll(event: any): void {
    const scrollLeft = event.target.scrollLeft;
    const containerWidth = event.target.offsetWidth;
    this.currentIndexImage = Math.round(scrollLeft / containerWidth);
  }
}
