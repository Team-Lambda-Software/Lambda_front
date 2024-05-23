import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Dimension {
  width: string,
  heigth: string
}

@Component({
  selector: 'app-square-skeleton',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './square-skeleton.component.html',
  styleUrl: './square-skeleton.component.css'
})
export class SquareSkeletonComponent {
  @Input()
  public dimensions: Dimension = { width: '50px', heigth: '50px'}
}
