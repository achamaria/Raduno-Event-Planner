import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import { LoginPage } from "../login/login";
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
  username: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.forgotGroup = this.formBuilder.group({
      username: ['', Validators.required, Validators.maxLength(15)],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      confirmPass: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
    });

    this.username = this.forgotGroup.controls['username'];
    this.password = this.forgotGroup.controls['password'];
    this.confirmPass = this.forgotGroup.controls['confirmPass'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  showLogin(){
    if(this.forgotGroup.valid)
      this.navCtrl.push(LoginPage);
    else {
      this.showAlert();
    }
  }

  showAlert() {
    let alertEmpty = this.alertCtrl.create({
      title: 'Required!',
      subTitle: 'username and password should not be empty',
      buttons: ['OK']
    });

    alertEmpty.present();

  }

}
