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

  updateProfileData: FirebaseObjectObservable<any>;
  profile: any;
  currUser: any;

  editUser = {} as User;
  editProfile = {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth:AngularFireAuth, private afDatabase :AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth => {
      this.currUser = auth;
      this.afDatabase.list(`profile/${auth.uid}`).valueChanges().subscribe(profile => {
        this.profile = profile[0];
        this.editProfile = this.profile;
      });
    });
  }

  // update profile data
   updateProfile(currUser: any, profile: any) {
     this.afAuth.authState.subscribe(auth => {
       this.updateProfileData = profile;
       this.afDatabase.list(`profile/${auth.uid}`).remove();
       this.afDatabase.list(`profile/${auth.uid}`).update(auth.uid, this.updateProfileData);
       auth.updateEmail(currUser.email);
       auth.updatePassword(currUser.password);
       this.navCtrl.push(ProfilePage);
     });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}
