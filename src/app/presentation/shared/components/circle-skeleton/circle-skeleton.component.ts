import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-skeleton',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './circle-skeleton.component.html',
  styleUrl: './circle-skeleton.component.css'
})
export class CircleSkeletonComponent {

  @Input() public radio: string = '50px';
}
