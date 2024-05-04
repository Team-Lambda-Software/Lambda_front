import { Component, Input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

interface IProgram{
  id: number;
  name: string;
  teacher: string;
  level: number;
  image: string;
}

@Component({
  selector: 'app-programs-tag',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './programs-tag.component.html',
  styleUrl: './programs-tag.component.css'
})
export class ProgramsTagComponent {

  @Input({ required: true }) public programs!: IProgram[]

  constructor() {}
}
