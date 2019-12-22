import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Book } from '../model/book.model';
import { BooksService } from '../service/books.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  selectedBooks: Book[];
  finalPrice: number;
  fullPrice: number;
  isLoading = true;

  constructor(private dataService: DataService, private bookService: BooksService, private router: Router) { }

  ngOnInit() {
   this.selectedBooks = this.dataService.getSelectedBooks();
   this.bookService.getOffer(this.selectedBooks).pipe(take(1)).subscribe(commercialOffer => {
     this.finalPrice = this.dataService.getBestOfferPrice(commercialOffer, this.selectedBooks);
     this.fullPrice = this.dataService.getFullPrice(this.selectedBooks);
     this.isLoading = false;
   });
  }

  back() {
    this.router.navigate(['/'])
  }

}
