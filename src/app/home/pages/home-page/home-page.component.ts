import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface navOptions {
  name: string;
  reditect: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true,
  imports: [RouterLink]
})

export class HomePageComponent { 

  public navOptions: navOptions[] = [
    {
      name: 'Tomorrow',
      reditect: '/tomorrow'
    },
    {
      name: 'Today',
      reditect: '/today'
    },
    {
      name: 'Yesterday',
      reditect: '/yesterday'
    },
  ]
}
