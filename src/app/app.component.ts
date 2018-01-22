import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//runs by default login page
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from "../pages/profile/profile";
import {SettingsPage} from "../pages/settings/settings";
import {FeedbackPage} from "../pages/feedback/feedback";
import {FAQsPage} from "../pages/fa-qs/fa-qs";
import { TabsPage } from "../pages/tabs/tabs";

export interface PageInterface {
  title: string;
  pageName: string;
  component: any;
  index: number;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;

  //pages: Array<{title: string, pageName: any, component: any, icon: string}>;

  pages: PageInterface[] = [
    { title: 'Profile', pageName: 'TabsPage', component: ProfilePage, index: 0, icon: 'person' },
    { title: 'Settings', pageName: 'TabsPage', component: SettingsPage, index: 1, icon: "settings" },
    { title: 'Feedback', pageName: 'TabsPage', component: FeedbackPage, index: 2, icon: "star" },
    { title: 'FAQs', pageName: 'TabsPage', component: FAQsPage, index: 3, icon: "help" }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }


  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario// The active child nav is our Tabs Navigation
      this.nav.getActiveChildNav().select(page.index);

  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();

    // matches the active tab item with menu item and if it matches, returns the color
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.component) {
        return 'primary';
      }
      return;
    }
    return;
  }
}

