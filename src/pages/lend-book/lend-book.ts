import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Book } from '../../models/Book';
import { Service } from '../../services/service';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm } from '@angular/forms';



@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit{

  index: number;
  book: Book;
  bookForm: FormGroup;

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController,
              private service: Service,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.book = this.service.bookList[this.index];
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      nameOfLend: this.formBuilder.array([])
    });
  }

  getNameOfLendArray() {
    return this.bookForm.get('nameOfLend') as FormArray;
  }

  onAddNameOfLend() {
    let newControl = this.formBuilder.control('');
    this.getNameOfLendArray().controls.push(newControl);
  }

  onRemoveNameOfLend(index: number) {
    this.getNameOfLendArray().removeAt(index);
  }

  onSubmitForm(form: NgForm) {
    this.service.saveBookList();
    this.service.emitBook();
    this.viewCtrl.dismiss();
  }
  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onLend() { 
    this.service.onToggleMedia(this.book);
  }
}
