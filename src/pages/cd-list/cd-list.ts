import { Component, OnInit, OnDestroy } from '@angular/core';
import { Service } from '../../services/service';
import { Cd } from '../../models/Cd';
import { ModalController, MenuController } from 'ionic-angular';
import { LendCdPage } from '../lend-cd/lend-cd';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage implements OnInit, OnDestroy {

  cdList: Cd[];
  cdSubscription : Subscription;

  constructor(private service: Service,
              private modalCtrl: ModalController,
              private menuCtrl: MenuController) {}


  ngOnInit () {
    this.cdSubscription = this.service.cd$.subscribe(
       (cd: Cd[]) => {
         this.cdList = cd;
       }
     ),
     this.service.fetchCdList();
   }

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

  ngOnDestroy() {
    this.cdSubscription.unsubscribe();
  }
}
