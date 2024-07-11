import { Component, inject, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { SquareSkeletonComponent } from '../../../../../shared/components/square-skeleton/square-skeleton.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BlogArticleComponent } from '../../../home-page/components/blog-article/blog-article.component';
import { BlogUsecaseProvider } from '../../../../../../core/blog/infrastructure/providers/blog-usecase-provider';
import { ILittleCard } from '../../../../interfaces/ILittleCard';
import { DOCUMENT } from '@angular/common';
import { finalize, map } from 'rxjs';
import { PartialBlogToILittleCardAdapter } from '../../../../adapters/BlogAdapter';
import { TrainerGetManyProvider } from '../../../../../../core/trainer/infrastructure/providers/trainer-get-many.service';
import { TrainerDetailToILittleCard } from '../../../../adapters/LitleCardAdapter';
import { LitleCardComponent } from '../../../../components/litle-card/litle-card.component';
import { CarruselBgImgComponent } from '../../../../components/carrusel-bg-img/carrusel-bg-img.component';

@Component({
  selector: 'app-followed-trainers',
  standalone: true,
  imports: [
    TranslocoModule,
    RouterLink,
    SquareSkeletonComponent,
    InfiniteScrollModule,
    BlogArticleComponent,
    LitleCardComponent,
    CarruselBgImgComponent
  ],
  templateUrl: './followed-trainers.component.html',
  styleUrl: './followed-trainers.component.css'
})
export class FollowedTrainersComponent {
  
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
      .execute(`?perPage=3&page=${this.currentPage}&userFollow=${true}`)
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
