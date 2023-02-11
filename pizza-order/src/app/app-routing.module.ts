import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthComponent } from './components/app-auth/app-auth.component';
import { AppListComponent } from './components/app-list/app-list.component';

const routes: Routes = [
  { path: '', component: AppAuthComponent },
  { path: 'home', component: AppListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
