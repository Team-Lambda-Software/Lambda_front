import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ]
})

export class HomePageComponent implements OnInit{
  
  ngOnInit(): void {
  
  }


}
