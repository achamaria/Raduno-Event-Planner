import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

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

  greeting: any;
  contactList = [];
  eventDetails = [];
  key: string | null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private afAuth: AngularFireAuth,  private afDatabase: AngularFireDatabase) {

    this.greeting = this.navParams.get('image');
    this.eventDetails = this.navParams.get('event_details');
    console.log("sdsdsfreeeee", this.eventDetails);
    this.contactList = this.eventDetails[0]['invitees'];
    console.log("invitees", this.contactList);
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

  removeContact(contact){
    let index = this.contactList.indexOf(contact);

    if(index > -1){
      this.contactList.splice(index, 1);
    }
  }

  saveGreeting(){
    this.afAuth.authState.take(1).subscribe(auth => {
          this.key = this.afDatabase.list(`event`)
            .push({"hostID":this.eventDetails[0]['hostID'],
                   "title": this.eventDetails[0]['title'],
                   "date": this.eventDetails[0]['date'],
                   "location": this.eventDetails[0]['location'],
                   "budget": this.eventDetails[0]['budget'],
                   "invitees": this.contactList,
                   "greetingCard": this.greeting}).key;
          console.log("new key: " + this.key);
          this.afDatabase.database.ref(`event/${this.key}`).update({"key": this.key});
          console.log("new key: " + this.key)
    });
    this.showAlert();
  }
}
