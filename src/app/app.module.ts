import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from "src/environments/environment";
import { AngularFireModule} from "@angular/fire/compat";
import { AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { SetAvatarComponent } from './set-avatar/set-avatar.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { EncryptDecryptService, EncryptDecryptServiceInstance } from './service/encrypt-decrypt.service';
import { NewsFeedFunction, NewsFeedFunctionInstance } from './service/news-feed-function.service';
import { CreateNewsComponent } from './home/share/create-news/create-news.component';
import { CommentComponent } from './home/share/comment/comment.component';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { FriendsComponent } from './home/share/friends/friends.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewNewsPictureComponent } from './view-news-picture/view-news-picture.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    SetAvatarComponent,
    CreateNewsComponent,
    CommentComponent,
    FriendsComponent,
    PageNotFoundComponent,
    ViewNewsPictureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [EncryptDecryptService,
    {
      provide:EncryptDecryptServiceInstance,
      useValue: new EncryptDecryptService(),
    }
    // {
    // provide: NewsFeedFunctionInstance,
    // useValue: new NewsFeedFunction(),
    // }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
