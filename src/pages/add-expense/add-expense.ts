import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {BudgetPage} from "../budget/budget";

/**
 * Generated class for the AddExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-expense',
  templateUrl: 'add-expense.html',
})
export class AddExpensePage {

  event: any;
  expenseDetail: any = {
    "amount": "",
    "description": "",
    "date" : ""
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,  private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
   this.event = navParams.get('event');
    console.log(this.event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddExpensePage');
  }

  addExpense(){
    this.afDatabase.list(`event/` + this.event["key"] + "/expense/")
      .push(this.expenseDetail)
      .then(() => this.closeModal());
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
