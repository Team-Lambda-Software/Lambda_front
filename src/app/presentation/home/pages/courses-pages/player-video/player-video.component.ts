import { Component, OnInit, Input, inject, signal, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute,RouterLink } from '@angular/router';
import { BasicHeaderComponent } from '../../../components/basic-header/basic-header.component';
import { Course, Lesson, PartialCourse } from '../../../../../core/course/domain/course.model';
import { CourseUsecaseProvider } from '../../../../../core/course/infrastructure/providers/course-usecase-provider';
import { finalize } from 'rxjs';

interface PlayerOptions {
  redirect?: string;
  title: string;
  content: string;
  videoUrl: string;
}

@Component({
  selector: 'app-player-video',
  standalone: true,
  imports: [RouterLink, BasicHeaderComponent],
  templateUrl: './player-video.component.html',
  styleUrl: './player-video.component.css'
})
export class PlayerVideoComponent {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  public lesson?: Lesson;
  public idCourse?: string;
  public idLesson?: string;
  public courseUseCaseService = inject(CourseUsecaseProvider);
  public isLoading = false;
  public course? : Course;
  
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe( (params: { [key: string ]: string }) => {
      if(params['course']) {
        this.idCourse = params['course'];
      }else{
        this.router.navigate(['/home'])
      }
      if(params['lesson']) {
        this.idLesson = params['lesson'];
      }
    })
  }

  ngOnInit() {
    this.getCourse(this.idCourse!);
  }

  public getCourse(id: string){
    this.isLoading = true
    this.courseUseCaseService.usecase.getById(id)
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe( course =>{
      this.course = course
      if(this.idLesson){
        this.lesson = course.lessons.find(lesson => lesson.id == this.idLesson)
      }else{
        this.lesson = course.lessons[0]
      }
    })
  }

  public hasNext(){
    if(this.lesson?.id == this.course?.lessons[this.course?.lessons.length - 1].id){
      return false
    }
    return true
  }

  public hasPrevious(){
    if(this.lesson?.id == this.course?.lessons[0].id){
      return false
    }
    return true
  }

  public setNextLesson(){
    console.log('click');
    if(this.hasNext()){
      let indexLesson = this.course?.lessons.findIndex(lesson => lesson.id == this.lesson?.id)
      this.router.navigate([] ,{queryParams: {course: this.idCourse, lesson: this.course?.lessons[indexLesson! + 1].id}, queryParamsHandling: 'merge'});
      this.lesson = this.course?.lessons[indexLesson! + 1];
      this.videoPlayer.nativeElement.load();
    }
  }

  public setPreviusLesson(){
    console.log('click');
    
    if(this.hasPrevious()){
      let indexLesson = this.course?.lessons.findIndex(lesson => lesson.id == this.lesson?.id)
      this.router.navigate([] ,{queryParams: { lesson: this.course?.lessons[indexLesson! - 1].id}, queryParamsHandling: 'merge'});
      this.lesson = this.course?.lessons[indexLesson! - 1];
      this.videoPlayer.nativeElement.load();
    }
  }
}
