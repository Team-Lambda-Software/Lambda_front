import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutPageComponent } from './pages/layoutPage/layoutPage.component';

const routes:Routes=[
  {
    path:'',
    component:LayoutPageComponent,
    children:[
      {
        path:'main',
        component:HomePageComponent
      },
      {
        path:'profile',
        component:ProfilePageComponent
      },
      {
        path:'**',
        redirectTo:'home'
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
