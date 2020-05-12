import { Book } from './book';

export class CartItem {

    id: string;
    name: string;
    image_url: string;
    unit_price: number;
    quatity: number;

    constructor(book: Book){
        this.id = book.id;
        this.name = book.name;
        this.image_url = book.image_url;
        this.unit_price = book.unit_price;
        this.quatity = 1

    }
    
}
