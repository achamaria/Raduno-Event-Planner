import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HomePage } from "../home/home";
import { LoginPage } from "../login/login";
import {TabsPage} from "../tabs/tabs";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private registerGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.registerGroup = this.formBuilder.group({
      fullname: ['', Validators.required, Validators.maxLength(30)],
      username: ['', Validators.required, Validators.maxLength(15)],
      email: ['', Validators.email, Validators.maxLength(35)],
      password: ['', Validators.required, Validators.minLength(6)],
      confirmPass: ['', Validators.required, Validators.minLength(6)],
      phone: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  showDashboard() {
    this.navCtrl.push(TabsPage);
  }

  showLogin(){
    this.navCtrl.push(LoginPage);
  }
}
