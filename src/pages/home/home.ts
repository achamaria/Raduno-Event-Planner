import { Component } from '@angular/core';
import {MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {EventPage} from "../event/event";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import firebase from "firebase";
import moment from "moment";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {ViewEventPage} from "../view-event/view-event";
import {TabsPage} from "../tabs/tabs";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profile: any;
  uId: string;
  pendingEvents: any = [];
  acceptedEvents: any = [];


  constructor(public navParams: NavParams, private afAuth: AngularFireAuth, public navCtrl: NavController,
              private toast: ToastController, public menu: MenuController, private afDatabase :AngularFireDatabase) {
    this.menu.enable(true);
    this.afAuth.authState.subscribe(auth => {
      this.afDatabase.list(`profile/${auth.uid}`).valueChanges().subscribe(profile => {
        this.profile = profile[0];
      });
    });
  }

  ionViewDidLoad(){
    this.afAuth.authState.subscribe(data=>{
      if(/*data && data.email && */data.uid) {
        this.uId = data.uid;
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

  ionViewWillEnter() {
    this.pendingEvents = [];
    let invitees: any = [];
    this.afAuth.authState.subscribe(data=>{
      this.uId = data.uid;
      this.afDatabase.list('/event/').valueChanges()
        .subscribe(eventSnapshots=>{
          eventSnapshots.map(event=>{
            invitees = event["invitees"];
            invitees.forEach(invitee=>{
              if(invitee["phone"]==this.profile["phone"]){
                if(invitee["accepted"]=="pending"){
                  this.pendingEvents.push(event);
                }
              }else{
                if(invitee["accepted"]=="true"){
                  this.acceptedEvents.push(event);
                }
              }
            })
          });
        });
    });
  }

  gotoEventPage(){
    this.navCtrl.push(EventPage);
  }

  viewEvent(key: string){
    this.afDatabase.list('/event/').valueChanges()
      .subscribe(values=>{
        values.map(value=>{
          if(value["key"] == key){
            this.navCtrl.push(ViewEventPage,{viewEvent : JSON.stringify(value)});
          }
        });
      });
  }

  acceptInvitation(key: string){
    let invitees: FirebaseListObservable<any>;
    this.afDatabase.list('/event/').valueChanges()
      .subscribe(eventSnapshots=>{
        eventSnapshots.map(event=>{
          invitees = event["invitees"];
          invitees.forEach(invitee=>{
            if(invitee["phone"]==this.profile["phone"]){
              if(invitee["accepted"]=="pending"){
                invitee["accepted"] = "accepted";
                invitee["uid"] = this.uId.toString();
                console.log("main data");
                console.log(invitees);
                this.afDatabase.database.ref(`event/${key}`).update({"invitees": invitees});
                this.navCtrl.setRoot(TabsPage);
              }
            }
          });
        });
      });
  }

  declineInvitation(key: string){
    let invitees: FirebaseListObservable<any>;
    this.afDatabase.list('/event/').valueChanges()
      .subscribe(eventSnapshots=>{
        eventSnapshots.map(event=>{
          invitees = event["invitees"];
          invitees.forEach(invitee=>{
            if(invitee["phone"]==this.profile["phone"]){
              if(invitee["accepted"]=="pending"){
                invitee["accepted"] = "declined";
                console.log("main data");
                console.log(invitees);
                this.afDatabase.database.ref(`event/${key}`).update({"invitees": invitees});
                this.navCtrl.setRoot(TabsPage);
              }
            }
          })
        });
      });
  }

}
