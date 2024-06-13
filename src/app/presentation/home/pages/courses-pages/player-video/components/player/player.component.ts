import { Component, ElementRef, Input, Signal, ViewChild, effect } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

  @Input({required: true}) _inputVideo!: Signal<string>
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  public videoUrl : string = ''

  constructor() {
    effect(() => {
      this.videoUrl = this._inputVideo()
      if(this.videoUrl) this.videoPlayer.nativeElement.load();
    })
   }

}
