import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

  constructor(public navCtrl: NavController) {

  }
  ngOnInit() {
    console.log('ngOnInit ContactPage');
  }
}
