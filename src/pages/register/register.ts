import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {AngularFireAuth} from "angularfire2/auth";
import { HomePage } from "../home/home";
import { LoginPage } from "../login/login";
import {TabsPage} from "../tabs/tabs";
import {User} from "../../models/user";
import {Profile} from "../../models/profile";
import {AngularFireDatabase} from "angularfire2/database";


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  profile = {} as Profile;

  private registerGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              public alertCtrl: AlertController, private afAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase) {
    this.registerGroup = this.formBuilder.group({
      fullname: ['', Validators.required, Validators.maxLength(30)],
      username: ['', Validators.required, Validators.maxLength(15)],
      email: ['', Validators.email, Validators.maxLength(35)],
      password: ['', Validators.required, Validators.minLength(6)],
      confirmPass: ['', Validators.required, Validators.minLength(6)],
      phone: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  async register(user: User, profile: Profile) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

      console.log(result);

      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.list(`profile/${auth.uid}`).push(profile)
          .then(() => this.navCtrl.push(TabsPage));
      });
    }
    catch (e){
      console.error(e);
    }
  }

  showLogin(){
    this.navCtrl.push(LoginPage);
  }
}
