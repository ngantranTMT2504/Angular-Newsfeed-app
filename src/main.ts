import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { initializeApp } from "firebase/app";

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  // firebase : {
  //   apiKey: "AIzaSyB9ZqlceEA5d7vCkZ7O7p1Xy5jlra4aask",
  //   authDomain: "frontend-app-d71b7.firebaseapp.com",
  //   projectId: "frontend-app-d71b7",
  //   storageBucket: "frontend-app-d71b7.appspot.com",
  //   messagingSenderId: "812139634178",
  //   appId: "1:812139634178:web:2dbd4d1593a7ca33a1911b"
  // };