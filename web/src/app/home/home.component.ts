import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Router } from "@angular/router";
import { PostComponent } from "../post/post.component";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: any;
  display = "none";
  admins: any;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = firebase.auth().currentUser;
    console.log(this.user);
    this.user = firebase.auth().currentUser;
    db.list("/Admins")
      .valueChanges()
      .subscribe(admin => {
        this.admins = admin;
      });
  }

  checkAdmin(): boolean {
    for (let admin of this.admins) {
      if (admin == this.user.uid) {
        return true;
      }
    }
    return false;
  }

  logOut() {
    console.log("Logging out..");
    this.afAuth.auth.signOut();
    this.router.navigate(["/login"]);
  }

  newPost() {
    this.router.navigate(["/newpost"]);
  }

  ngOnInit() {}
}
