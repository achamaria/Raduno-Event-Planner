import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {ChatPage} from "../chat/chat";
import {ShopPage} from "../shop/shop";
import {BudgetPage} from "../budget/budget";
import {CalendarPage} from "../calendar/calendar";
import {ProfilePage} from "../profile/profile";
import {SettingsPage} from "../settings/settings";
import {FeedbackPage} from "../feedback/feedback";
import {FAQsPage} from "../fa-qs/fa-qs";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  shopRoot = ShopPage;
  budgetRoot = BudgetPage;
  homeRoot = HomePage;
  chatRoot = ChatPage;
  calendarRoot = CalendarPage;
  profileRoot = ProfilePage;
  settingsRoot = SettingsPage;
  feedbackRoot = FeedbackPage;
  faqRoot = FAQsPage;
  myIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Set the active tab based on the passed index from app.components.ts
    this.myIndex = navParams.data.tabIndex || 6;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
