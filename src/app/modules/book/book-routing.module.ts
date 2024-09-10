import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageBookComponent } from './pages/home-page-book/home-page-book.component';
import { BookPageDetailComponent } from './pages/book-page-detail/book-page-detail.component';
import { BookPageSearchComponent } from './pages/book-page-search/book-page-search.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomePageBookComponent },
      { path: 'search', component: BookPageSearchComponent },
      { path: ':olid', component: BookPageDetailComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
