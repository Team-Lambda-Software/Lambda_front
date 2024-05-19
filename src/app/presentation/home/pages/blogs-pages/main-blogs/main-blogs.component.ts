import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { IBlog } from '../../../interfaces/blog-model';
import { ICard, ILittleCard } from '../../../interfaces/ILittleCard';
import { CardCarruselComponent } from '../../../components/card-carrusel/card-carrusel.component';
import { BlogCardAdapter } from '../../../adapters/CardAdapter';
import { BlogLitleCardAdapter } from '../../../adapters/LitleCardAdapter';
import { LitleCardComponent } from '../../../components/litle-card/litle-card.component';

interface ICategory {
  name: string;
  reditect: string;
}

@Component({
  selector: 'app-main-blogs',
  standalone: true,
  imports: [RouterLink, TranslocoModule, CommonModule, CardCarruselComponent, LitleCardComponent],
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
      instructor: 'Pedro',
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      category: 'Prenatal', date:'Feb 17,2020' ,
      imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg'
    },
    {
      id: 2,
      instructor: 'Pedro',
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      category: 'Prenatal', date:'Feb 17,2020' ,
      imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg'
    },
    {
      id: 3,
      instructor: 'Pedro',
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      category: 'Prenatal', date:'Feb 17,2020' ,
      imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg'
    },
    {
      id: 4,
      instructor: 'Pedro',
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      category: 'Prenatal', date:'Feb 17,2020' ,
      imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg'
    },
    {
      id: 5,
      instructor: 'Pedro',
      title: 'How to get started with a healthy lifestyle',
      description: 'A healthy lifestyle is one which helps to keep and improve your health and well-being. There are many different things that you can do to live a healthy lifestyle, such as eating healthy, being physically active, maintaining a healthy weight, and managing your stress.',
      thumbnail: 'https://via.placeholder.com/150',
      category: 'Prenatal', date:'Feb 17,2020' ,
      imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg'
    }
  ];

  public recentBlogs: IBlog[] = [
    { id: 1, instructor:'Pedro', title: 'Prenatal Yoga Prenatal Yoga Prenatal Yoga', category: 'Prenatal', date:'Feb 17,2020' , imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg',description: 'A ',  thumbnail: 'https://via.placeholder.com/150'},
    { id: 2, instructor:'Juan', title: 'Prenatal Yoga Prenatal Yoga Prenatal Yoga', category: 'Prenatal', date:'Feb 17,2020' , imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg',description: 'A ',  thumbnail: 'https://via.placeholder.com/150'},
    { id: 3, instructor: 'Maria',title:'Prenatal Yoga Prenatal Yoga Prenatal Yoga', category: 'Prenatal', date:'Feb 17,2020' , imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg',description: 'A ',  thumbnail: 'https://via.placeholder.com/150'},
  ];

    public selectBlogs: IBlog[] = [
    { id: 1, instructor:'Pedro', title: 'Prenatal Yoga Prenatal Yoga Prenatal Yoga', category: 'Prenatal', date:'Feb 17,2020' , imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg',description: 'A ',  thumbnail: 'https://via.placeholder.com/150'},
    { id: 2, instructor:'Juan', title: 'Prenatal Yoga Prenatal Yoga Prenatal Yoga', category: 'Prenatal', date:'Feb 17,2020' , imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg',description: 'A ',  thumbnail: 'https://via.placeholder.com/150'},
    { id: 3, instructor: 'Maria',title:'Prenatal Yoga Prenatal Yoga Prenatal Yoga', category: 'Prenatal', date:'Feb 17,2020' , imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg',description: 'A ',  thumbnail: 'https://via.placeholder.com/150'},
  ];
  
  public selectedCategory: string = "Most Popular";

  constructor(private router:Router, private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      if(params['category']) {
        this.setSelectedCategory(params['category']);
      }
    });
  }

  adaptBlogToCard(): ICard[] {
    let blogs = this.selectBlogs.map((blog) => BlogCardAdapter(blog));
    return blogs;
  }

  adaptBlogToLitleCard(data: IBlog): ILittleCard{
    return BlogLitleCardAdapter(data);
  }
  

  onCategorySelected(category : ICategory) {
    this.router.navigate([] ,{queryParams: {category: category.name}, queryParamsHandling: 'merge'});
    this.setSelectedCategory(category.name);
  }

  setSelectedCategory(category : string) {
    this.selectedCategory = category;
  }
}