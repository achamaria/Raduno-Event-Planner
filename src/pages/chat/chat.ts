import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {HostEventProvider} from "../../providers/host-event/host-event";
import firebase from "firebase";
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  hostedEvents: any = [];
  message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private afAuth: AngularFireAuth,  private afDatabase: AngularFireDatabase,
              public hostEventsProvider: HostEventProvider) {
    this.hostedEvents = this.hostEventsProvider.getHostedEventsWithBudget();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage(){

  }

}
