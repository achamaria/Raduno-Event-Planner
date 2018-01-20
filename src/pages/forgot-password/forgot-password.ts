import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from "../login/login";
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  private forgotGroup : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.forgotGroup = this.formBuilder.group({
      username: ['', Validators.required, Validators.maxLength(15)],
      password: ['', Validators.required, Validators.minLength(6)],
      confirmPass: ['', Validators.required, Validators.minLength(6)]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  showLogin(){
    this.navCtrl.push(LoginPage);
  }

}
