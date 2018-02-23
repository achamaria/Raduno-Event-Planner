import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {EditProfilePage} from "../edit-profile/edit-profile";
import {LoginPage} from "../login/login";
import firebase from "firebase";
import {FirebaseObjectObservable} from "angularfire2/database-deprecated";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile: any;
  currUser: any;
  picData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth:AngularFireAuth,private afDatabase :AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth => {
      this.currUser = auth;
      this.picData = firebase.storage().ref('/').child(this.currUser.uid).getDownloadURL()
        .then(function(url){
          console.log("log1: " + url);
          return url;
        }).catch(res=>{
          console.log("errrrrrrrrrrrrrrrrrrrrrr");
        });
      this.afDatabase.list(`profile/${auth.uid}`).valueChanges().subscribe(profile => {
        this.profile = profile;
        console.log("profiledata: ");
        console.log(this.profile);
        console.log(auth);
      });
    });

  }

  editProfile(){
    this.navCtrl.push(EditProfilePage);
    console.log("button clicked");
  }

  deleteAccount(){
    this.afAuth.authState.subscribe(auth => {
      this.currUser = auth;
      this.afDatabase.list(`profile/${auth.uid}`).remove();
      auth.delete();
      this.navCtrl.setRoot(LoginPage);
    });
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.afAuth.authState.subscribe(auth => {
      this.currUser = auth;
      this.picData = firebase.storage().ref('/').child(this.currUser.uid).getDownloadURL()
        .then(function(url){
          console.log("log1: " + url);
          return url;
        }).catch(res=>{
          console.log("errrrrrrrrrrrrrrrrrrrrrr");
        });
      this.afDatabase.list(`profile/${auth.uid}`).valueChanges().subscribe(profile => {
        this.profile = profile;
        console.log("profiledata: ");
        console.log(this.profile);
        console.log(auth);
      });
    });
  }

}
