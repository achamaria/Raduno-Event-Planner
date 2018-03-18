import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import { LoginPage } from "../login/login";
import {AngularFireAuth} from "angularfire2/auth";
import {TabsPage} from "../tabs/tabs";
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  private forgotGroup : FormGroup;

  password: AbstractControl;
  confirmPass: AbstractControl;
  email: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              private afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    this.forgotGroup = this.formBuilder.group({
      email: ['', Validators.required, Validators.maxLength(15)],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      confirmPass: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
    });

    this.email = this.forgotGroup.controls['email'];
    this.password = this.forgotGroup.controls['password'];
    this.confirmPass = this.forgotGroup.controls['confirmPass'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  showLogin(){
    if(this.forgotGroup.valid) {
      this.afAuth.auth.sendPasswordResetEmail(String(this.email));
      this.navCtrl.push(LoginPage);
    }
    else {
      this.showAlert();
    }
    this.navCtrl.push(LoginPage);
  }

  showAlert() {
    let alertEmpty = this.alertCtrl.create({
      title: 'Required!',
      subTitle: 'email and password should not be empty',
      buttons: ['OK']
    });

    alertEmpty.present();

  }

}
