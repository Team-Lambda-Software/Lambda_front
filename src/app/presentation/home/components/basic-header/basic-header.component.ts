import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

interface BasicHeaderOptions {
  redirect: string;
  name: string;
}

@Component({
  selector: 'app-basic-header',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './basic-header.component.html',
  styleUrl: './basic-header.component.css'
})
export class BasicHeaderComponent {

  @Input({ required: true }) public options!: BasicHeaderOptions
}
