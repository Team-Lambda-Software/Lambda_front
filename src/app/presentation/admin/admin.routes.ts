import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LayoutComponent } from './layout/layout.component';
import { AddCoursePageComponent } from './add-course-page/add-course.component';
import { AddBlogPageComponent } from './add-blog-page/add-blog.component';

export const AdminRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'main',
        component: HomePageComponent
      },
      {
        path: 'addcourse',
        component: AddCoursePageComponent
      },
      {
        path: 'addblog',
        component: AddBlogPageComponent
      }
    ]
  }
]
