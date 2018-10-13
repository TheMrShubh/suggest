import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { PostComponent } from "./post/post.component";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from ".//app-routing.module";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { FormsModule } from "@angular/forms";
import { AuthService } from "./auth.service";
import { NewPostComponent } from "./new-post/new-post.component";
import { GraphComponent } from './graph/graph.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PostComponent,
    NewPostComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
