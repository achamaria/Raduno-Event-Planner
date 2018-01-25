import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {User} from "firebase/app";
import {Profile} from "../../models/profile";
import {ProfilePage} from "../profile/profile";
import {FirebaseObjectObservable} from "angularfire2/database-deprecated";

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  newEmail = "";
  newPassword = "";

  profile: any;
  currUser: any;

  editUser = {} as User;
  editProfile = {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth:AngularFireAuth, private afDatabase :AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth => {
      this.currUser = auth;
      this.editUser = this.currUser;
      console.log("Current User: ");
      console.log(this.currUser);
      this.afDatabase.list(`profile/${auth.uid}`).valueChanges().subscribe(profile => {
        this.profile = profile[0];
        this.editProfile = this.profile;
        console.log("Current User Profile: ");
        console.log(this.editProfile);
      });
    });
  }

  // update profile data
   updateProfile() {
     console.log("Processed New user email: ");
     console.log(this.newEmail);

     this.afAuth.authState.subscribe(auth => {
       this.afDatabase.list(`profile/${auth.uid}`).remove();
       this.afDatabase.list(`profile/${auth.uid}`).update(auth.uid, this.profile);
       if(this.newEmail.length>0){
         auth.updateEmail(this.newEmail);
       }
       if(this.newPassword.length>5){
         auth.updatePassword(this.newPassword);
       }
       this.navCtrl.setRoot(ProfilePage);
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}
