import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/book.model';
import { CommercialOffer } from '../model/commercial-offer.model';

@Injectable({
    providedIn: 'root'
  })
export class BooksService {
    constructor(private http: HttpClient) {}

    public getAllBooks() {
        return this.http.get<Book[]>('http://henri-potier.xebia.fr/books');
    }

    public getOffer(selectedBooks: Book[]) {
        const request = this.buildRequest(selectedBooks);
        return this.http.get<CommercialOffer>(request);
    }

    private buildRequest(books: Book[]) {
        let result = 'http://henri-potier.xebia.fr/books/'

        books.forEach((book, index) => {
            result += book.isbn;
            if(index < books.length -1) {
                result += ','
            }
        });
        result += '/commercialOffers';
        return result;
    }

}