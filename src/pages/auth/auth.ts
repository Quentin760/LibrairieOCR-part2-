import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authService } from '../../services/AuthService';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage implements OnInit {

  mode: string;
  authForm: FormGroup;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private menuCtrl: MenuController,
              private formBuilder: FormBuilder,
              private authService: authService
              ) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    if (this.mode === 'new') {
      this.authService.signUpUser(email, password).then(
        () => {
          this.navCtrl.setRoot(TabsPage);
        },
        (error) => {
          
        }
      );
    } else if (this.mode === 'connect') {
      this.authService.signInUser(email, password).then(
        () => {
          this.navCtrl.setRoot(TabsPage);
        },
        (error) => {

        }
      );
    }
  }
}
