import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestIntroComponent } from './test-intro/test-intro.component';
import { AboutComponent } from './about/about.component';
import { TesterComponent } from './tester/tester.component';
import { AdminSigninComponent } from './admin-signin/admin-signin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: TestIntroComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  },
  {
    path: 'test',
    component: TesterComponent
  },
  {
    path: 'signin',
    component: AdminSigninComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
