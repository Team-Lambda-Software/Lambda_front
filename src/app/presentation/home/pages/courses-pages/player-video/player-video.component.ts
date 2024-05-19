import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-player-video',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './player-video.component.html',
  styleUrl: './player-video.component.css'
})
export class PlayerVideoComponent {
  public router = inject(Router);
}
