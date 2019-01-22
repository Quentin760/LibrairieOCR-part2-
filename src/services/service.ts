import { Book } from "../models/Book";
import { Cd } from "../models/Cd";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable()
export class Service {

    cd$ = new Subject<Cd[]>();
    book$ = new Subject<Book[]>();

    bookList: Book[] = [
        {
            name: 'La horde du contrevent',
            isLend: true,
            nameOfLend: 'Leetchi'
        },
        {
            name: 'Le Seigneur des anneaux',
            isLend: false,
            nameOfLend: ''
        },
        {
            name: 'Les Misérables',
            isLend: true,
            nameOfLend: 'Julie'
        },
        {
            name: 'Fondation',
            isLend: true,
            nameOfLend: 'Quentin'
        },
        
    ];
    cdList: Cd[] = [
        {
            name: 'Rumours',
            isLend: true,
            nameOfLend: ''
        },
        {
            name: 'Thriller',
            isLend: false,
            nameOfLend: ''
        },
        {
            name: 'Irish Tour 74',
            isLend: true,
            nameOfLend: ''
        },
        
    ];

    constructor(private storage: Storage) {}

    onToggleMedia(item: any) {
        let CDOrBook = item;
		CDOrBook.isLend = !CDOrBook.isLend;
    }

    emitCd() {
        this.cd$.next(this.cdList);
      }
    emitBook() {
        this.book$.next(this.bookList);
      }

    saveData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('cd').set(this.cdList).then(
            (data: DataSnapshot) => {
              resolve(data);
            },
          )
          firebase.database().ref('book').set(this.bookList).then(
                (data: DataSnapshot) => {
                  console.log("save book");
                  resolve(data);
                },
            (error) => {
              reject(error);
            }
          );
        });
      }
    
      retrieveData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('cd').once('value').then(
            (data: DataSnapshot) => {
              this.cdList = data.val();
              this.emitCd();
              resolve('Données récupérées avec succès !');
          firebase.database().ref('book').once('value').then(
              (data : DataSnapshot) => {
                  this.bookList = data.val();
                  this.emitBook();
                  resolve('Données récupérées avec succès !');
              }
          )
            }, (error) => {
              reject(error);
            }
          );
        });
      }

      saveList() {
        this.storage.set('book', this.bookList);
      }
    
      fetchList() {
        this.storage.get('book').then(
          (list) => {
            if (list && list.length) {
              this.bookList = list.slice();
            }
            this.emitBook();
          }
        );
      }
}