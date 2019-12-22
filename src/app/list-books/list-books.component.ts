import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';
import { Book } from '../model/book.model';
import { BooksService } from '../service/books.service';
import { DataService } from '../service/data.service';
import { MatTableDataSource } from '@angular/material';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListBooksComponent implements OnInit {

  allBooks: Observable<Book[]> = null;
  columnsToDisplay = ['title', 'price', 'checked'];
  expandedElement: Book | null;
  selectedBooks: Book[] = [];
  dataSource: MatTableDataSource<Book>;
  isLoading = true;

  constructor(private booksService: BooksService, private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.booksService.getAllBooks().pipe(take(1)).subscribe(books => {
      this.dataSource = new MatTableDataSource(books);
      this.isLoading = false;
    });
  }

  selectBook(event, book: Book) {
    event.stopPropagation();

    if(this.selectedBooks.indexOf(book) === -1) {
      this.selectedBooks.push(book);
    } else {
      this.selectedBooks.splice(this.selectedBooks.indexOf(book), 1);
    }
    
  }

  openBasket() {
    this.dataService.setSelectedBooks(this.selectedBooks);
    this.router.navigate(['/basket']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
