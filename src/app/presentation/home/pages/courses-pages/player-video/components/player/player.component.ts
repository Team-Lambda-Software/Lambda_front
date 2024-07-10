import { Component, ElementRef, Input, Signal, ViewChild, effect, inject, OnDestroy } from '@angular/core';
import { ProgressCourseUseCaseProvider } from '../../../../../../../core/progress/infraestructure/providers/progress-course-usecase.provider';
import { ProgressCourse } from '../../../../../../../core/progress/application/interfaces/dto/progress-course.interface';
import { interval, Subscription } from 'rxjs';
import { SaveProgressUseCaseProvider } from '../../../../../../../core/progress/infraestructure/providers/save-progress-usecase.provider';

export interface SectionProperties {
  idCourse: string,
  idLesson: string,
  indexLesson: number
}

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

  @Input({required: true}) _inputVideo!: Signal<string>
  @Input({required: true}) _properties!: Signal<SectionProperties>
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  public progressUseCaseService = inject(ProgressCourseUseCaseProvider);
  public saveProgressUseCaseService = inject(SaveProgressUseCaseProvider);
  private intervalId!: Subscription;
  private videoEnded = false;

  public videoUrl : string = ''
  

  ngOnInit(){
    this.intervalId = interval(10000).subscribe(() => this.saveProgress())

    this.videoPlayer.nativeElement.addEventListener('ended', () => {
      console.log('El video ha finalizado');
      this.videoEnded = true;
      this.saveProgress();
      // Opcional: realizar otras acciones, como detener el intervalo de guardado de datos o mostrar un mensaje al usuario.
    });

    this.getProgress(this._properties().idCourse);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      this.intervalId.unsubscribe(); // Use unsubscribe to cancel the subscription
    }
  }

  constructor() {
    effect(() => {
      this.getProgress(this._properties().idCourse);
    })
  }

  saveProgress(): void {
    if (!this.videoPlayer || !this.videoPlayer.nativeElement || this.videoEnded) {
      return;
    }

    if (!this.videoPlayer.nativeElement.paused) {
    
      const videoElement = this.videoPlayer.nativeElement;
      const videoDuration = videoElement.duration;
      console.log(`Duración del video: ${Math.floor(videoDuration)} segundos`);

      const currentTime = videoElement.currentTime;
      console.log(`Tiempo actual del video: ${Math.floor(currentTime)} segundos`);

      console.log('Video finalizado??: ', this.videoEnded);
      
      console.log(`Guardando progreso del curso ${this._properties().idCourse} y lección ${this._properties().idLesson}`);

      this.saveProgressUseCaseService.usecase.execute({
        courseId: this._properties().idCourse,
        lessonId: this._properties().idLesson,
        time: Math.floor(currentTime),
        markAsCompleted: this.videoEnded,
        totalTime: Math.floor(videoDuration)
      }).subscribe( result => {
        if (result.isError()){
          console.log(result.getError().message);
        }else{
          console.log('Progreso guardado correctamente');
        }
      
      })
    }
  }

  async getProgress(id: string) {
    let req = await this.progressUseCaseService.usecase.execute(id)

    req.subscribe( progress =>{
      if (progress.isError()){
        console.log(progress.getError().message);
      }else{
        const progressCourse = progress.getValue() as ProgressCourse;
        
        const lesson = progressCourse.lessons.find(lesson => lesson.lessonId == this._properties().idLesson)
        if(lesson){
          console.log(`La lección ${lesson.lessonId} tiene un progreso de ${lesson.time} segundos`);
          if (lesson.time === this.getVideoDurationInSec()) this.videoEnded = true;
          this.setVideoStartTime(lesson.time)
        }
      }
    }
    )
  }

  private getVideoDurationInSec(): number {
    if (!this.videoPlayer || !this.videoPlayer.nativeElement) {
      return 0;
    }

    let sec = this.videoPlayer.nativeElement.duration;

    return Math.floor(sec);
  }

  setVideoStartTime(seconds: number) {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoUrl = this._inputVideo()
      if(this.videoUrl){
        this.videoPlayer.nativeElement.currentTime = seconds;
        this.videoPlayer.nativeElement.load();
        this.videoPlayer.nativeElement.play();
      }
    }
  }

}
