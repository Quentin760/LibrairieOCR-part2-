import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BookListPage } from '../book-list/book-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onGoToBook() {
    this.navCtrl.push(BookListPage);
  }

}
