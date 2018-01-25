import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {AngularFireAuth} from "angularfire2/auth";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navParams: NavParams, private afAuth: AngularFireAuth, public navCtrl: NavController,
              private toast: ToastController) {

  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data=>{
      if(/*data && data.email && */data.uid) {
        this.toast.create({
          message: `Welcome to Raduno, ${data.email}`,
          duration: 3000,
        }).present();
      }
      else{
        this.toast.create({
          message: `Could not find the user.`,
          duration: 3000,
        }).present();
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }


}
