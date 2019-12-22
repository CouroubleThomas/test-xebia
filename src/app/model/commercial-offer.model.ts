export interface CommercialOffer {
    offers: Offer[];
}

export interface Offer {
    type: OfferType;
    value: number;
    sliceValue? : number;
}

export enum OfferType {
    Percent = 'percentage',
    Minus = 'minus',
    Slice = 'slice'
}