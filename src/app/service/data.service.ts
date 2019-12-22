import { Injectable } from '@angular/core';
import { Book } from '../model/book.model';
import { CommercialOffer, Offer, OfferType } from '../model/commercial-offer.model';

@Injectable({
    providedIn: 'root'
  })
export class DataService {

    selectedBooks: Book[] = [];

    public setSelectedBooks(books: Book[]) {
        this.selectedBooks = books;
    }

    public getSelectedBooks() {
        return this.selectedBooks;
    }

    public getBestOfferPrice(commercialOffer: CommercialOffer, books: Book[]) {
        const fullPrice = this.getFullPrice(books)
        let finalPrice = fullPrice;
        commercialOffer.offers.forEach( offer => {
            finalPrice = finalPrice > this.getFinalPrice(offer, fullPrice) ? this.getFinalPrice(offer, fullPrice) : finalPrice;
        });
        return finalPrice;
    }

    public getFullPrice(books: Book[]) {
        let fullPrice = 0;        
        books.forEach(book => {
            fullPrice += book.price;
        });
        return fullPrice
    }

    private getFinalPrice(offer: Offer, fullPrice: number) {
        switch(offer.type) {
            case OfferType.Percent:
                return ((100 - offer.value) * 0.01) * fullPrice;
            case OfferType.Minus:
                return fullPrice - offer.value;
            case OfferType.Slice:
                return fullPrice - (Math.trunc(fullPrice / offer.sliceValue) * offer.value)
        }
    }

}
