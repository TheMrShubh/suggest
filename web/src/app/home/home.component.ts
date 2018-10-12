import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: any;
  constructor(public afAuth: AngularFireAuth) {
    this.user = firebase.auth().currentUser;
  }

  isLoggedIn() {
    if (this.user == null) {
      console.log("null");
      return false;
    } else {
      return true;
    }
  }

  logOut() {
    console.log("Logging out..");
    this.afAuth.auth.signOut();
  }
  ngOnInit() {
    this.user = firebase.auth().currentUser;
  }
}
