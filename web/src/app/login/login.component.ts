import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import * as firebase from "firebase/app";
import { auth } from "firebase/app";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  //isAdmin: boolean;
  user: any;
  users: any[];
  admins: any[];
  error: any;
  isOn = 1;
  adminCode: number;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    //this.isAdmin = false;
    db.list("/Users")
      .valueChanges()
      .subscribe(val => {
        this.users = val;
      });
    db.list("/Admins")
      .valueChanges()
      .subscribe(val => {
        this.admins = val;
      });
  }

  logInAsUser() {
    console.log("Logging in as User..");
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(sucess => {
        this.user = firebase.auth().currentUser;
        var uid = this.user.uid;
        var flag = false;
        for (let userUID of this.users) {
          if (userUID == uid) {
            flag = true;
            console.log("Already Registered User");
            break;
          }
        }
        if (flag == false) {
          this.registerUser(uid);
        }
        this.router.navigate(["/home"]);
        console.log(this.user.displayName);
        console.log(this.users);
      });
  }

  registerUser(uid: String) {
    firebase
      .database()
      .ref("/Users")
      .push(uid);
    console.log("New User Registered");
    this.router.navigate(["/home"]);
  }

  registerAdmin(uid: String) {
    firebase
      .database()
      .ref("/Admins")
      .push(uid);
    console.log("New Admin Registered");
    this.router.navigate(["/home"]);
  }

  logInAsAdmin() {
    console.log("Logging in as admin..");
    if (this.adminCode == 123) {
      this.afAuth.auth
        .signInWithPopup(new auth.GoogleAuthProvider())
        .then(sucess => {
          this.user = firebase.auth().currentUser;
          var uid = this.user.uid;
          var flag = false;
          for (let adminUID of this.admins) {
            if (adminUID == uid) {
              flag = true;
              console.log("Already Registered Admin");
              break;
            }
          }
          if (flag == false) {
            this.registerAdmin(uid);
          }
          this.router.navigate(["/home"]);
        });
    } else {
      console.log("Wrong Admin Code");
    }
  }

  ngOnInit() {}
}
