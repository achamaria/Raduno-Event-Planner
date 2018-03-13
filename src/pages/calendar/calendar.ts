import { Component } from '@angular/core';
import {IonicPage, NavController, Platform, NavParams, MenuController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database/database";
import { HostEventProvider } from '../../providers/host-event/host-event';
import {TabsPage} from "../tabs/tabs";
import {AngularFireAuth} from "angularfire2/auth";
import moment from "moment";
import { Calendar } from '@ionic-native/calendar';
import {getHostElement} from "@angular/core/src/render3/component";
/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  providers: [HostEventProvider]
})
export class CalendarPage {
  events: any = [];
  hostedEvents: any = [];
  eventDate: any;
  date: any;
  name: any;
  e: any;
  listedEvents: any = [];
  profile: any = [];
  currUser: any;
  currDate: any = new Date();
  currentEvents: any = [];
  calendars = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public hostEventsProvider: HostEventProvider,
              private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private calendar: Calendar, private plt: Platform) {

    this.plt.ready().then(() => {
      console.log("platform is ready");
    })
  }

  //this method is called when date is selected from the calendar
  onDaySelect(e){
    //stores selected date into 'name'
    this.name= (e.month+1) + "/" + e.date + "/"+ e.year;
    this.getHostedEventsForChat();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
    this.afAuth.authState.subscribe(auth => {
      this.currUser = auth;
      this.afDatabase.list(`profile/${auth.uid}`).valueChanges().subscribe(profile => {
        this.profile = profile[0];
      });
    });
  }


  getHostedEventsForChat(){

    this.afDatabase.list('/event/').valueChanges()
      .subscribe(eventSnapshots=>{
        this.listedEvents = [];
        eventSnapshots.map(event=>{
          //events are saved in 'event' object
          var invitees = event["invitees"];
          //array of invitees
          this.eventDate = event["date"];
          console.log("event date entered");
          this.eventDate = moment(this.eventDate).format('l');// converting the eventDate into format of 'm/d/yyyy'
          console.log("check Selected date :"+ this.name.toString() + "& Event Date :" +this.eventDate.toString());
          if(this.name.toString() == this.eventDate.toString())
          {
            console.log("is equal. Event with selected date exists.");
            invitees.forEach(invitee=>{
              if(invitee.uid == this.currUser.uid && invitee.accepted == "accepted"){
                console.log("is invited");
                this.listedEvents.push(event);
              }else if( event["hostID"] == this.currUser.uid){
                console.log("is host");
                this.listedEvents.push(event);
              }else{
                console.log("end of loop, NO EVENTS");
              }
              console.log(this.listedEvents);
            });

          }else {
            console.log("not equal. Event with selected date doesn't exist");
          }
          console.log("----------------------");
        });
      });
  }



  ionViewWillEnter(){
    console.log('ionViewWillEnter CalendarPage');
  }

  moveToEventPreview(){
    this.navCtrl.push(TabsPage);
  }
}
