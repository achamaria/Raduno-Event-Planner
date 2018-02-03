import { Component } from '@angular/core';
import {MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {EventPage} from "../event/event";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public myEvent = {};
  uId: string;
  pendingInvitees: any = [];


  constructor(public navParams: NavParams, private afAuth: AngularFireAuth, public navCtrl: NavController,
              private toast: ToastController, public menu: MenuController, private afDatabase :AngularFireDatabase) {

    this.menu.enable(true);




  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data=>{
      if(/*data && data.email && */data.uid) {
        this.uId = data.uid;
        this.toast.create({
          message: `Welcome to Raduno, ${data.email}`,
          duration: 3000,
        }).present();

        this.afDatabase.list('/event').valueChanges()
          .subscribe(eventSnapshots=>{
              let invitees: any = [];
              let events: any = [];
            console.log(eventSnapshots);
            console.log("length", eventSnapshots.length);
              for(var i=0; i < eventSnapshots.length; i++){
                events = eventSnapshots[i];
                for(var j=0; j < events['invitees'].length; j++)
                    if(events['invitees'][j]['accepted'] == 'pending'){
                      console.log('pending');
                    }
              }

            });
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
    this.navCtrl.push(EventPage);
  }


}
