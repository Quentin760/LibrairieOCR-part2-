export class Book {

    isLend: boolean;
    nameOfLend : string;

    constructor (public name: string) {
        this.isLend = false;
        this.nameOfLend = '';
    }
}