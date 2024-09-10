import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookRoutingModule } from './book-routing.module';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { HomePageBookComponent } from './pages/home-page-book/home-page-book.component';
import { BookPageDetailComponent } from './pages/book-page-detail/book-page-detail.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { RouterLink } from '@angular/router';
import { BookPageSearchComponent } from './pages/book-page-search/book-page-search.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent,
    HomePageBookComponent,
    BookPageDetailComponent,
    BookCardComponent,
    BookPageSearchComponent,
  ],
  imports: [CommonModule, BookRoutingModule, BookRoutingModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookModule {}
