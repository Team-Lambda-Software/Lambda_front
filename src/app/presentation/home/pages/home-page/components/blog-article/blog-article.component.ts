import { Component, Input } from '@angular/core';
import { ILittleCard } from '../../../../interfaces/ILittleCard';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-article',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-article.component.html',
  styleUrl: './blog-article.component.css'
})
export class BlogArticleComponent {
  @Input({ required: true }) public blog!: ILittleCard;
}
