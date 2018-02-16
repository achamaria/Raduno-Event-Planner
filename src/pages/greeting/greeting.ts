import { Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, Platform} from 'ionic-angular';
import {Camera} from "@ionic-native/camera";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import firebase from "firebase";
import {File} from "@ionic-native/file";
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
  private textArr: any = [];
  private selectedText;
  colors: any = [];
  public  selectedFontColor;
  public  selectedBackColor;
  public Fbref:any;
  picData: any;

  hostID: any;

  public selectedFontFamily;
  fontFamily = ['Arial', 'Georgia', 'Monaco', 'Hoefler Text', 'Courier', 'Calibri', 'Apple Chancery',
                'Avenir Next Condensed', 'Bodoni 72 Smallcaps', 'Brush Script MT', 'Chalkduster', 'Bradley Hand'];



  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, public camera: Camera, private afAuth:AngularFireAuth,
              private afDatabase :AngularFireDatabase, public file: File) {


    this.toast.create({
      message: `Event is successfully created.`,
      duration: 3000,
    }).present();

    this.colors.push({
      'colorName': 'Red',
      'colorCode': '#ff0000'
    });

    this.colors.push({
      'colorName': 'Blue',
      'colorCode': '#0000ff'
    });

    this.colors.push({
      'colorName': 'White',
      'colorCode': '#ffffff'
    });

    this.colors.push({
      'colorName': 'Black',
      'colorCode': '#000000'
    });

    this.colors.push({
      'colorName': 'Green',
      'colorCode': '#00ff00'
    });
  }

  ionViewDidLoad() {
    this.canvas = new fabric.Canvas('canvas');
  }

  addText(){

    var text = new fabric.IText("add text...", {
     fontFamily: 'Calibri',
     padding: 3,
     fontSize: 15,
     fill: '#000',
   });
    text.key = this.textArr.length ;
    this.textArr[text.key] = text;
    this.canvas.add(text);
    var self = this;
    text.on('selected', function() {
      self.selectedText = self.textArr[this['key']];
    });
  }

  removeText(){
    if(this.selectedText){
      this.canvas.remove(this.selectedText);
    }
    else{
      this.toast.create({
        message: `Select the object to remove`,
        duration: 3000,
      }).present();
    }
  }

  getSelectedFontFamily(){
    if(this.selectedText){
      this.selectedText.fontFamily = this.selectedFontFamily;
      this.canvas.renderAll();
    }
    else{
      this.toast.create({
            message: `Select the object`,
            duration: 3000,
      }).present();
    }

  }

  getSelectedBackColor(){
    this.canvas.setBackgroundImage(null);
    this.canvas.renderAll();
    this.canvas.backgroundColor = this.selectedBackColor;
      this.canvas.renderAll();
  }

  getSelectedFontColor(){
    if(this.selectedText){
      console.log(this.selectedFontColor);
      this.selectedText.fill = this.selectedFontColor;
      this.canvas.renderAll();
    }
    else{
      this.toast.create({
        message: `Select the object to apply color`,
        duration: 3000,
      }).present();
    }
  }

  getMedia(){
    this.camera.getPicture({
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType:this.camera.MediaType.ALLMEDIA,
      destinationType:this.camera.DestinationType.FILE_URI
    }).then(fileuri=>{

      window.resolveLocalFileSystemURL("file://"+fileuri, EF=>{
        EF.file(file=>{
          var fileReader = new FileReader();
          this.canvas.backgroundColor = 'White';
          this.canvas.renderAll();
          var self = this;
          fileReader.onload = function (e) {
            fabric.Image.fromURL(e.target.result, function(img) {
              self.canvas.setBackgroundImage(img, self.canvas.renderAll.bind(self.canvas), {
                scaleX: self.canvas.width / img.width,
                scaleY: self.canvas.height / img.height
              });
            });
          };
          fileReader.readAsDataURL(file);
        });
      });
    })
  }


  clearCanvasBackground(){
    if(this.canvas.backgroundImage != null){
      this.canvas.setBackgroundImage(null);
      this.canvas.renderAll();
    }
    else if(this.selectedBackColor){
      this.canvas.backgroundColor = 'White';
      this.canvas.renderAll();
    }
    else {
      this.toast.create({
        message: `Canvas background is already cleared`,
        duration: 3000,
      }).present();
    }

  }


  saveGreeting(){
    var self = this;

    var greeting = self.canvas.toDataURL('svg');

    // this.afAuth.authState.take(1).subscribe(auth => {
    //   this.hostID = auth.uid;
    //   console.log(this.hostID);
    //   this.afDatabase.list(`greeting`)
    //     .push({"hostID":this.hostID, "greetingCard": greeting})
    //     .then(() => this.navCtrl.push(GreetingPage));
    // });

    console.log("image", greeting);
    var folderpath = "file:///storage/emulated/0/";
    // Split the base64 string in data and contentType
    var block = greeting.split(";");
// Get the content type
    var dataType = block[0].split(":")[1];// In this case "image/png"
    console.log("datatype:", dataType);
// get the real base64 content of the file
    var realData = block[1].split(",")[1];
    console.log("real", realData);

    const bytes: string = atob(realData);
    const byteNumbers = new Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      byteNumbers[i] = bytes.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob: Blob = new Blob([byteArray], { type: 'image/png' });

    console.log(this.file.dataDirectory);
    this.file.writeFile(folderpath, 'file.jpg', blob);

  }



}
