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

  listedEvents: any = [];
  message: string;
  selectedEventKey: string;
  currUser: any;
  profile: any;
  messages: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private afAuth: AngularFireAuth,  private afDatabase: AngularFireDatabase,
              public hostEventsProvider: HostEventProvider) {
    this.getHostedEventsForChat();

  }

  getHostedEventsForChat(){
    this.afDatabase.list('/event/').valueChanges()
      .subscribe(eventSnapshots=>{
        this.listedEvents = [];
        eventSnapshots.map(event=>{
          if(event["hostID"] == this.currUser.uid){
            this.listedEvents.push(event);
          }
          var invitees = event["invitees"];
          invitees.forEach(invitee=>{
            if(invitee.uid == this.currUser.uid && invitee.accepted == "accepted"){
              this.listedEvents.push(event);
            }
          });
        });
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');


    this.afAuth.authState.subscribe(auth => {
      this.currUser = auth;
      this.afDatabase.list(`profile/${auth.uid}`).valueChanges().subscribe(profile => {
        this.profile = profile[0];
      });
    });
  }

  selectEventForChat(){
    this.afDatabase.list('event/'+this.selectedEventKey+"/chat").valueChanges()
      .subscribe(data=>{
        this.messages = data;
      });
  }

  sendMessage(){
    this.afDatabase.list("event/" + this.selectedEventKey + "/chat/").push({
      'name': this.profile["name"],
      'message': this.message,
      'uid': this.currUser.uid
    });

    this.message = '';
  }

}
