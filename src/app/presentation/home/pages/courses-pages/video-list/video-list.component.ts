import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ICategory } from '../../../interfaces/category-model';
import { IVideoCourses } from '../../../interfaces/video-courses-model';
import { CategoriesService } from '../../../services/categories/categories.service';
import { CategoryDataAdapterCourse } from '../../../adapters/CategoryDataAdapter';
import { PlayerCardAdapter } from '../../../adapters/PlayerCardAdapter';
import { PlayerCardComponent } from '../../../components/player-card/player-card.component';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [RouterLink, TranslocoModule, CommonModule, PlayerCardComponent],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent {

  public categoriesService = inject(CategoriesService);
  public fetchedCategories= signal<ICategory[]>([])

  public videos: IVideoCourses[]  = [
    {
      id: 1,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 2,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 3,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 4,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 5,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 6,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 7,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 8,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    }
  ];

  public selectedCategory?: ICategory;

  ngOnInit() {
    this.getCategories();
  }

  constructor(private router:Router, private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params: { [key: string ]: string }) => {
      if(params['category']) {
        this.fetchedCategories().forEach((category) => {
          if(category.name === params['category']) {
            this.setSelectedCategory(category);
          }
        });
      }
    });
  }
  

  adaptToPlayerCard(video: IVideoCourses) {
    return PlayerCardAdapter(video);
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.fetchedCategories.set(categories.map((category) => CategoryDataAdapterCourse(category)));
      this.setSelectedCategory(this.fetchedCategories()?.[0]);
    });

  }

  onCategorySelected(category: ICategory) {
    this.router.navigate([] ,{queryParams: {category: category.name}, queryParamsHandling: 'merge'});
    this.setSelectedCategory(category);
  }

  setSelectedCategory(category : ICategory) {
    this.selectedCategory = category;
  }
}
