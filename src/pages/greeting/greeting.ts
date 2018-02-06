import { Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, Platform} from 'ionic-angular';
import {Camera} from "@ionic-native/camera";
declare var window: any;
declare var fabric: any;
/**
 * Generated class for the GreetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-greeting',
  templateUrl: 'greeting.html'
})
export class GreetingPage {

 // @ViewChild('myCanvas') canvas: any;

  private canvas;
  private text;

  public selectedFontFamily;
  fontFamily = ['Arial', 'Georgia', 'Monaco', 'Hoefler Text', 'Courier', 'Calibri', 'Apple Chancery',
                'Avenir Next Condensed', 'Bodoni 72 Smallcaps', 'Brush Script MT', 'Chalkduster', 'Bradley Hand'];

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, public camera :Camera) {

    this.toast.create({
      message: `Event is successfully created.`,
      duration: 3000,
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GreetingPage');
    this.canvas = new fabric.Canvas('canvas');
  }

  addText(){

    if(!this.text){
      this.text = new fabric.IText("add text...", {
        fontFamily: 'Calibri',
        padding: 3,
        fontSize: 15,
        fill: '#000',
      });
      this.canvas.add(this.text);
    }
    else if(this.text){
      this.removeText();
    }
    else {
      this.toast.create({
        message: `Select the font family of text that you want to apply`,
        duration: 3000,
      }).present();
    }
  }

  removeText(){
    this.canvas.remove(this.text);
    // /this.canvas.clear();
  }

  getSelectedFontFamily(){
    this.text.fontFamily = this.selectedFontFamily;
  }


}
