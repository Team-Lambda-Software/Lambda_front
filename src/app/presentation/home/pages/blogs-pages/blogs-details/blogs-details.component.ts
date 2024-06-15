import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { BlogUsecaseProvider } from '../../../../../core/blog/infrastructure/providers/blog-usecase-provider';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../../../../core/blog/domain/blog.model';
import { BasicHeaderComponent } from '../../../components/basic-header/basic-header.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { SquareSkeletonComponent } from '../../../../shared/components/square-skeleton/square-skeleton.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';

@Component({
  selector: 'app-blogs-details',
  standalone: true,
  imports: [
    BasicHeaderComponent,
    CommentBoxComponent,
    SquareSkeletonComponent,
    CommentSectionComponent
  ],
  templateUrl: './blogs-details.component.html',
  styleUrl: './blogs-details.component.css'
})
export class BlogsDetailsComponent implements OnInit {
  @ViewChild('comments') commentSection!: CommentSectionComponent;
  private blogUseCase = inject(BlogUsecaseProvider);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public id?: string;
  public blog = signal<Blog | null>(null);


  constructor() {
    this.route.queryParams.subscribe((params) => {
      if(params['id']) {
        this.id = params['id'];
      } else this.router.navigate(['/home'])
    });
  }

  ngOnInit () {
    this.blogUseCase.usecase.getById(this.id!)
      .subscribe(this.blog.set)
  }

  onCommentCreated() {
    this.commentSection.getComments();
  }
}
