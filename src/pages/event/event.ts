import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GreetingPage} from "../greeting/greeting";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  contactList = [];

  private EventFormGroup : FormGroup;

  title: any;
  date: any;
  location: any;
  budget?: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
      public alertCtrl: AlertController, private afAuth: AngularFireAuth,  private afDatabase: AngularFireDatabase) {


      // adds new contact in the phone contacts
    // this.friends.name = new ContactName(null, 'Smith', 'John');
    // this.friends.phoneNumbers = [new ContactField('mobile', '6471234567')];
    // this.friends.save().then(
    //   () => console.log('Contact saved!', this.friends),
    //   (error: any) => console.error('Error saving contact.', error)
    // );

    this.EventFormGroup = this.formBuilder.group({
      title: ['', Validators.compose([ Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('[a-zA-Z]*')])],
      date: ['', Validators.compose([ Validators.required])],
      location: ['', Validators.compose([ Validators.required, Validators.maxLength(30)])],
      budget: [" "]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  gotoGreetingPage(){

    console.log("length", this.contactList.length);

    if(!this.EventFormGroup.valid || this.contactList.length == 0){
      this.showAlert();
    }
    else {
      if(this.budget == undefined)
      {
        this.budget = " ";
        console.log(this.budget);
      }

      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.list(`event/${auth.uid}/`)
          .push({"title": this.title, "date": this.date, "location": this.location, "budget": this.budget, "invitees": this.contactList})
          .then(() => this.navCtrl.push(GreetingPage));
      });
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Make sure missing information is filled and invites are added',
      buttons: ['OK']
    });
    alert.present();
  }

  getContacts(){
    let self = this;
    if(self.contactList.length < 10) {
      navigator.contacts.pickContact(function (contact) {
        console.log("Sdfasd" + self.contactList.length);
        var obj = {"name": contact.displayName, "phone": contact.phoneNumbers[0]['value']};
        console.log("sdfasd" + self.contactList.indexOf(obj));
        console.log("data" + JSON.stringify(self.contactList[0]));
        console.log("data1" + JSON.stringify(obj));
        if(self.checkDuplicateContacts(obj, self.contactList)){
          let alert = self.alertCtrl.create({
            title: 'Warning!',
            subTitle: 'You can not add duplicates invitees ',
            buttons: ['OK']
          });
          alert.present();
        }else{
          self.contactList.push({"name": contact.displayName, "phone": contact.phoneNumbers[0]['value']});
        }
        console.log(self.contactList);
      }, function (err) {
        console.log('Error: ' + err);
      });
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: 'You can not add more than 10 invites for standard account ',
        buttons: ['OK']
      });
      alert.present();
    }

  }

  removeContact(contact){
    let index = this.contactList.indexOf(contact);

    if(index > -1){
      this.contactList.splice(index, 1);
    }
  }

  checkDuplicateContacts(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
        return true;
      }
    }
    return false;
  }

}
