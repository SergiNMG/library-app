import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Author } from 'src/app/interfaces/models/Author';
import { BookDetail } from 'src/app/interfaces/models/BookDetail';
import { Work } from 'src/app/interfaces/models/Work';
import { newtonsCradle } from 'ldrs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent {
  @Input() bookSelected!: BookDetail;
  @Input() olid!: String;
  @Input() authorList!: Author[];
  @Input() works!: Work[];
  @Input() loading!: boolean;
}
