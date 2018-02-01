import { Component } from '@angular/core';
import {MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {LoginPage} from "../login/login";
import {EventPage} from "../event/event";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navParams: NavParams, private afAuth: AngularFireAuth, public navCtrl: NavController,
              private toast: ToastController, public menu: MenuController) {

    this.menu.enable(true);
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

  gotoEventPage(){
    this.navCtrl.setRoot(EventPage);
  }


}
