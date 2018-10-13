import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Router } from "@angular/router";
import { PostComponent } from "../post/post.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: any;
  display = "none";
  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = firebase.auth().currentUser;
    console.log(this.user);
  }

  logOut() {
    console.log("Logging out..");
    this.afAuth.auth.signOut();
    this.router.navigate(["/login"]);
  }

  newPost() {
    this.router.navigate(["/newpost"]);
  }

  ngOnInit() {
    this.user = firebase.auth().currentUser;
  }
}
