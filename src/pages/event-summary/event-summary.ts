import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the EventSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-summary',
  templateUrl: 'event-summary.html',
})
export class EventSummaryPage {

  image: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.image = this.navParams.get('image');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventSummaryPage');
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Congratulations!',
      subTitle: 'Event confirmed and invitation sent',
      buttons: ['OK']
    });
    alert.present();
  }
}
