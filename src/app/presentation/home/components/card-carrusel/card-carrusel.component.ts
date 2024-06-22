import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BigCardComponent } from '../big-card/big-card.component';
import { ICard } from '../../interfaces/ILittleCard';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SquareSkeletonComponent } from '../../../shared/components/square-skeleton/square-skeleton.component';

@Component({
  selector: 'app-card-carrusel',
  standalone: true,
  imports: [BigCardComponent, InfiniteScrollModule, SquareSkeletonComponent],
  templateUrl: './card-carrusel.component.html',
  styleUrl: './card-carrusel.component.css'
})
export class CardCarruselComponent {
  
  @Input({required: true}) public items!: ICard[];
  @Input({required: true}) public routerLink!: string;
  @Input({required: false}) public loadingQuantity?: number;
  @Output() public scrolled = new EventEmitter<void>();

  public onScroll(): void {
    this.scrolled.emit();
  }

  createArrayByNumber(): number[] {
    return new Array(this.loadingQuantity).fill(0);
  }
}
