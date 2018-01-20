import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ForgotPasswordPage } from "../forgot-password/forgot-password";
import { RegisterPage } from "../register/register";
import { HomePage } from "../home/home";
import {TabsPage} from "../tabs/tabs";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.loginGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  forgot(){
    this.navCtrl.push(ForgotPasswordPage, null);
  }

  register(){
    this.navCtrl.push(RegisterPage, null);
  }

  showDashboard() {
    let user = this.loginGroup.value;
    if (user.username != "" && user.password != ""){
      if (user.username == "admin" && user.password == "admin") {
        this.navCtrl.push(TabsPage, {
          username: user.username
        });
      }
      else
        this.showAlert("incorrect");
    }
    else{
      this.showAlert("empty");
    }
  }

  showAlert(str: String) {
    let alertIncorrect = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: 'Incorrect username or password',
      buttons: ['OK']
    });

    let alertEmpty = this.alertCtrl.create({
      title: 'Required!',
      subTitle: 'Username and password should not be empty',
      buttons: ['OK']
    });

    if(str == "empty")
      alertEmpty.present();
    else
      alertIncorrect.present();

  }

}
