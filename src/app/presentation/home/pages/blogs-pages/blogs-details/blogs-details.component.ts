import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { BlogUsecaseProvider } from '../../../../../core/blog/infrastructure/providers/blog-usecase-provider';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../../../../core/blog/domain/blog.model';
import { BasicHeaderComponent } from '../../../components/basic-header/basic-header.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { SquareSkeletonComponent } from '../../../../shared/components/square-skeleton/square-skeleton.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { IComment } from '../../../../../core/comments/domain/comment.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ImgCarrouselComponent } from './components/img-carrousel/img-carrousel.component';

type BlogSafeHtml = Omit<Blog, 'description'> & { description: SafeHtml }; 

@Component({
  selector: 'app-blogs-details',
  standalone: true,
  imports: [
    BasicHeaderComponent,
    CommentBoxComponent,
    SquareSkeletonComponent,
    CommentSectionComponent,
    ImgCarrouselComponent
  ],
  templateUrl: './blogs-details.component.html',
  styleUrl: './blogs-details.component.css'
})
export class BlogsDetailsComponent implements OnInit {
  @ViewChild('comments') commentSection!: CommentSectionComponent;
  private blogUseCase = inject(BlogUsecaseProvider);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  public id?: string;
  public blog = signal<BlogSafeHtml | null>(null);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      if(params['id']) {
        this.id = params['id'];
      } else this.router.navigate(['/home'])
    });
  }

  ngOnInit () {
    this.blogUseCase.usecase.getById(this.id!)
      .subscribe({
        next: (blog) => {
          const blogDescription = blog.description.replace(/\\n/g, '<br>');
          const sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(blogDescription);
          this.blog.set({...blog, description: sanitizedDescription});
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  onCommentCreated($event: IComment) {
    this.commentSection.comments.set([...this.commentSection.comments(), $event]);
  }

}
