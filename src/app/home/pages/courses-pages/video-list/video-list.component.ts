import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

interface navOptions {
  name: string;
  reditect: string;
}

interface IVideo {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent {

  public navOptions: navOptions[] = [
    {
      name: 'Most Popular',
      reditect: '/home'
    },
    {
      name: 'Nutrition',
      reditect: '/nutrition'
    },
    {
      name: 'Training',
      reditect: '/training'
    },
  ]

  public videos: IVideo[]  = [
    {
      id: 1,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 2,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 3,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 4,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 5,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 6,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 7,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    },
    {
      id: 8,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=8A89M3nR2oY'
    }
  ];
}
