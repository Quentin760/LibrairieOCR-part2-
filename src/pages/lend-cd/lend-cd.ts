import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Cd } from '../../models/Cd';
import { Service } from '../../services/service';
import { Book } from '../../models/Book';


@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage implements OnInit {

  index: number;
  cd: Cd;
  book:Book;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public service: Service) {
  }

  ngOnInit () {
    this.index = this.navParams.get('index');
    this.cd = this.service.cdList[this.index];

  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }


  onLend() { 
    
    this.service.onToggleMedia(this.cd);
  }

}
