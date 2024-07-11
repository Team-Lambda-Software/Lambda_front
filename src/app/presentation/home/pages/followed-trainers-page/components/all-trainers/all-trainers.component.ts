import { Component, inject, OnInit, signal } from '@angular/core';
import { ILittleCard } from '../../../../interfaces/ILittleCard';
import { finalize, map } from 'rxjs';
import { TrainerDetailToILittleCard } from '../../../../adapters/LitleCardAdapter';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { SquareSkeletonComponent } from '../../../../../shared/components/square-skeleton/square-skeleton.component';
import { CarruselBgImgComponent } from '../../../../components/carrusel-bg-img/carrusel-bg-img.component';
import { TrainerGetManyProvider } from '../../../../../../core/trainer/infrastructure/providers/trainer-get-many.service';
import { DOCUMENT } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LitleCardComponent } from '../../../../components/litle-card/litle-card.component';

@Component({
  selector: 'app-all-trainers',
  standalone: true,
  imports: [
    RouterLink,
    TranslocoModule,
    SquareSkeletonComponent,
    CarruselBgImgComponent,
    InfiniteScrollModule,
    LitleCardComponent
  ],
  templateUrl: './all-trainers.component.html',
  styleUrl: './all-trainers.component.css'
})
export class AllTrainersComponent implements OnInit {
  
  private currentPage = 1;
  private TrainerGetManyService = inject(TrainerGetManyProvider);
  public isLoadingTrainers = signal(false);
  public trainers = signal<ILittleCard[]>([]);
  public isLoadingMoreTrainers = signal(false);
  public scrollContainer = inject(DOCUMENT).getElementById('scrollContainer');

  ngOnInit(): void {
    this.getTrainers();
  }

  public getTrainers() {
    if(this.currentPage === 1) this.isLoadingTrainers.set(true);
    else this.isLoadingMoreTrainers.set(true);
    this.TrainerGetManyService.usecase
      .execute(`?perPage=8&page=${this.currentPage}&userFollow=${false}`)
      .pipe(
        map(b => {
          if(b.isError()) {
            console.log(b.getError())
            return [];
          }
          else return b.getValue().map(TrainerDetailToILittleCard);
        }),
        finalize(() => {
          this.isLoadingTrainers.set(false);
          this.isLoadingMoreTrainers.set(false);
          this.currentPage++;
        })
      ).subscribe(t => 
        this.trainers.set([
          ...this.trainers(),
          ...t]
        )
      )
  }
}
