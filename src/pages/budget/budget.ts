import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HostEventProvider } from '../../providers/host-event/host-event';


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
  selectedEvent: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public hostEventsProvider: HostEventProvider) {
    this.menu.swipeEnable(true);
    this.hostedEvents = this.hostEventsProvider.getHostedEvents();
    console.log(this.hostedEvents);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPage');
  }

}
