import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { ListBooksComponent } from './list-books/list-books.component';

const appRoutes: Routes = [
  { path: 'basket', component: BasketComponent },
  { path: 'list', component: ListBooksComponent},
  { path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
