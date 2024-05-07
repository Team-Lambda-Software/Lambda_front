import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';


interface ICategory {
  name: string;
  reditect: string;
}

interface IBlog {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  imagenUrl: string;
  category: string;
  date: string;
}

interface IRecentBlog {
  id: number;
  teacher: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-main-blogs',
  standalone: true,
  imports: [RouterLink, TranslocoModule, CommonModule],
  templateUrl: './main-blogs.component.html',
  styleUrl: './main-blogs.component.css'
})
export class MainBlogsComponent {
  
  public categories: ICategory[] = [
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
    {
      name: 'Yoga',
      reditect: '/yoga'
    },
    {
      name: 'Prenatal',
      reditect: '/prenatal'
    },
    {
      name:'Otro',
      reditect: '/otro'
    },
  ]


  public blogs: IBlog[] = [
    {
      id: 1,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      category: 'Prenatal', date:'Feb 17,2020' ,
      imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg'
    },
    {
      id: 2,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      category: 'Prenatal', date:'Feb 17,2020' ,
      imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg'
    },
    {
      id: 3,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      category: 'Prenatal', date:'Feb 17,2020' ,
      imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg'
    },
    {
      id: 4,
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      category: 'Prenatal', date:'Feb 17,2020' ,
      imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg'
    }
  ];

  public recentBlogs: IRecentBlog[] = [
    { id: 1, teacher: 'Alexander', category: 'Trainning' , image: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg' },
    { id: 2, teacher: 'Paul', category: 'Trainning' , image: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg' },
    { id: 3, teacher: 'Felix', category: 'Trainning' , image: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg' },
    { id: 4, teacher: 'Felix', category: 'Trainning' , image: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg' },
    { id: 5, teacher: 'Felix', category: 'Trainning' , image: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg' },
    { id: 6, teacher: 'Felix', category: 'Trainning' , image: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg' },
  ];

    public selectBlogs: IBlog[] = [
    { id: 1, title: 'Prenatal Yoga Prenatal Yoga Prenatal Yoga', category: 'Prenatal', date:'Feb 17,2020' , imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg',description: 'A ',  thumbnail: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Prenatal Yoga Prenatal Yoga Prenatal Yoga', category: 'Prenatal', date:'Feb 17,2020' , imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg',description: 'A ',  thumbnail: 'https://via.placeholder.com/150'  },
    { id: 3, title: 'Prenatal Yoga Prenatal Yoga Prenatal Yoga', category: 'Prenatal', date:'Feb 17,2020' , imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg',description: 'A ',  thumbnail: 'https://via.placeholder.com/150'  },
  ];
  
  public selectedCategory: string = "Most Popular";

  constructor(private router:Router, private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      if(params['category']) {
        this.setSelectedCategory(params['category']);
      }
    });
  }

  onCategorySelected(category : ICategory) {
    this.router.navigate([] ,{queryParams: {category: category.name}, queryParamsHandling: 'merge'});
    this.setSelectedCategory(category.name);
  }

  setSelectedCategory(category : string) {
    this.selectedCategory = category;
  }
}