import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDmKiHuUq-GRI90lRSDQsS1d26NvSseKrs",
      authDomain: "ng-recipe-book-c156f.firebaseapp.com"
      });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
