import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController, ViewController } from 'ionic-angular';
import { HostEventProvider } from '../../providers/host-event/host-event';
import firebase from "firebase";
import {AddExpensePage} from "../add-expense/add-expense";

/**
 * Generated class for the BudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
  providers: [HostEventProvider]
})
export class BudgetPage {
  hostedEvents: any = [];
  selectedEvent: any = [];
  selectedEventKey : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,
              public hostEventsProvider: HostEventProvider, public modalCtrl: ModalController) {
      this.menu.swipeEnable(true);
      this.hostedEvents = this.hostEventsProvider.getHostedEventsWithBudget();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPage');
  }

  selectEventForBudget(){
    this.hostedEvents.forEach(item=>{
      if(item["key"]==this.selectedEventKey){
        this.selectedEvent = item;
      }
    });
  }

  presentAddExpenseModal() {
    let modal = this.modalCtrl.create(AddExpensePage, {event: this.selectedEvent});
    modal.present();
  }

}
