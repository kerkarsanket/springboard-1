import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { TrainerLayoutComponent } from './layouts/trainer-layout/trainer-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes =[
   {
    path: 'student',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  },

]},

{
  path: 'trainer',
  component: TrainerLayoutComponent,
  children: [
      {
    path: '',
    loadChildren: './layouts/trainer-layout/trainer-layout.module#TrainerLayoutModule'
},

]}


    // { path: 'dashboard',      component: DashboardComponent },
    // { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    // { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
   
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
