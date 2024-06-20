import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LitleCardComponent } from '../litle-card/litle-card.component';
import { ILittleCard } from '../../interfaces/ILittleCard';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SquareSkeletonComponent } from '../../../shared/components/square-skeleton/square-skeleton.component';

@Component({
  selector: 'app-carrusel-bg-img',
  standalone: true,
  imports: [
    LitleCardComponent,
    InfiniteScrollModule,
    SquareSkeletonComponent
  ],
  templateUrl: './carrusel-bg-img.component.html',
  styleUrl: './carrusel-bg-img.component.css'
})
export class CarruselBgImgComponent {

  @Output() public scrolled = new EventEmitter<void>();
  @Input({required: false}) public loadingQuantity?: number;
  @Input({ required: true }) public items!: ILittleCard[];

  onScroll(): void {
    this.scrolled.emit();
  }

  createArrayByNumber(): number[] {
    return new Array(this.loadingQuantity).fill(0);
  }
}
