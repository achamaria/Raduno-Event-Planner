import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {User} from "firebase/app";
import {Profile} from "../../models/profile";
import firebase from "firebase";
import {ProfilePage} from "../profile/profile";
import {Camera, File} from "ionic-native"
import {FirebaseObjectObservable} from "angularfire2/database";
declare var window: any;

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

  picData: any;
  picdata: any;
  picurl: any;
  mypicref: any;

  public options = {
    sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM,
    mediaType:Camera.MediaType.ALLMEDIA,
    destinationType:Camera.DestinationType.FILE_URI
  }

  public Fbref:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth:AngularFireAuth, private afDatabase :AngularFireDatabase) {
    this.mypicref = firebase.storage().ref('/');

    this.Fbref = firebase.storage().ref('/');

    this.afAuth.authState.subscribe(auth => {
      this.currUser = auth;
      this.editUser = this.currUser;
      console.log("Current User: ");
      console.log(this.currUser);
      this.picData = firebase.storage().ref('/').child(this.currUser.uid).getDownloadURL()
        .then(function(url){
          console.log("log1: " + url);
          return url;
        }).catch(res=>{
          console.log("errrrrrrrrrrrrrrrrrrrrrr");
        });
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

  ionViewWillEnter(){
    this.afAuth.authState.subscribe(auth => {
      this.currUser = auth;
      this.editUser = this.currUser;
      console.log("Current User: ");
      console.log(this.currUser);
      this.picData = firebase.storage().ref('/').child(this.currUser.uid).getDownloadURL()
        .then(function(url){
          console.log("log1: " + url);
          return url;
        }).catch(res=>{
          console.log("errrrrrrrrrrrrrrrrrrrrrr");
        });
      this.afDatabase.list(`profile/${auth.uid}`).valueChanges().subscribe(profile => {
        this.profile = profile[0];
        this.editProfile = this.profile;
        console.log("Current User Profile: ");
        console.log(this.editProfile);
      });
    });
  }

  getMedia(){
    Camera.getPicture(this.options).then(fileuri=>{
      window.resolveLocalFileSystemURL("file://"+fileuri, EF=>{
        EF.file(file=>{
          const FR = new FileReader()
          FR.onloadend=(res:any)=>{
            let AF = res.target.result
            let blob = new Blob([new Uint8Array(AF)],{type:'image/png'})
            this.upload(blob);
          };
          FR.readAsArrayBuffer(file);
        })
      })
    })
  }

  upload(blob:Blob){
    this.Fbref.child(this.currUser.uid).put(blob).then(savepic=>{
      this.picData['i'] = savepic.downloadURL
    });
  }

  takePic(){
    Camera.getPicture({
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.CAMERA,
      encodingType:Camera.EncodingType.PNG,
      saveToPhotoAlbum:true
    }).then(imagedata=>{
      this.picdata = imagedata;
      this.uploadPic();
    });
  }

  uploadPic(){
    this.mypicref.child(this.currUser.uid).putString(this.picdata,'base64', {contentType: 'image/png'})
      .then(savepic=>{
        this.picData['i'] = savepic.downloadURL
      })
  }

}
