import { Component } from '@angular/core';
import { Service } from '../../services/service';
import { Cd } from '../../models/Cd';
import { ModalController, MenuController } from 'ionic-angular';
import { LendCdPage } from '../lend-cd/lend-cd';


@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cdList: Cd[];

  constructor(private service: Service,
              private modalCtrl: ModalController,
              private menuCtrl: MenuController) {}

  ionViewDidLoad() {
    this.cdList = this.service.cdList.slice();
  }

  onLoadCd(index: number) {
    console.log("list Cd");
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }
  
  onToggleMenu() {
    this.menuCtrl.open();
  }
}
