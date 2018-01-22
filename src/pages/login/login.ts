import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ForgotPasswordPage } from "../forgot-password/forgot-password";
import { RegisterPage } from "../register/register";
import {TabsPage} from "../tabs/tabs";
import {User} from "../../models/user";
// import {AngularFireAuth} from "angularfire2/auth";
import {HomePage} from "../home/home";
import {AngularFireAuth} from "angularfire2/auth";

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

  user = {} as User;

  private loginGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              public alertCtrl: AlertController, private afAuth: AngularFireAuth, private toast: ToastController) {
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

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if(result) {

        console.log("in result function");
        this.navCtrl.setRoot(TabsPage);
      }
    }catch (e){
      this.toast.create({
        message: `Could not find the user.`,
        duration: 3000,
      }).present();
    }
  }
}
