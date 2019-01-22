import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Cd } from '../../models/Cd';
import { Service } from '../../services/service';
import { FormGroup, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';


@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage implements OnInit {

  index: number;
  cd: Cd;
  cdForm: FormGroup
  ;

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController,
              private service: Service,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.cd = this.service.cdList[this.index];
    this.initForm();
  }

  initForm() {
    this.cdForm = this.formBuilder.group({
      name: ['', Validators.required],
      nameOfLend: this.formBuilder.array([])
    });
  }

  getNameOfLendArray() {
    return this.cdForm.get('nameOfLend') as FormArray;
  }
  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onSubmitForm(form: NgForm) {
    this.service.saveCdList();
    this.service.emitCd();
    this.viewCtrl.dismiss();
  }

  onLend() { 
    
    this.service.onToggleMedia(this.cd);
  }

}
