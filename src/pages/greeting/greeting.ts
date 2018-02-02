import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

/**
 * Generated class for the GreetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-greeting',
  templateUrl: 'greeting.html',
})
export class GreetingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {

    this.toast.create({
      message: `Event is successfully created.`,
      duration: 3000,
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GreetingPage');
  }

}
