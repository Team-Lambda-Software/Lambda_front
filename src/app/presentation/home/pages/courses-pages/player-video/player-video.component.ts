import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BasicHeaderComponent } from '../../../components/basic-header/basic-header.component';

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
  @Input({ required: true }) public options!: PlayerOptions
  
}
