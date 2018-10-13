import { Component, OnInit } from "@angular/core";
import { NewPost } from "../NewPost";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.css"]
})
export class NewPostComponent implements OnInit {
  post: NewPost;
  today: Date;
  user: any;
  title = "";
  body = "";

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.user = firebase.auth().currentUser;
    console.log(this.user.displayName);
    this.post = new NewPost();
    this.today = new Date();
    this.post.date =
      this.today.getFullYear() +
      "/" +
      (this.today.getMonth() + 1) +
      "/" +
      this.today.getDate();
  }

  addSuggestion() {
    this.post.uid = this.user.uid;
    this.post.title = this.title;
    this.post.body = this.body;
    var newPostKey = firebase
      .database()
      .ref("/Suggestions")
      .push(this.post).key;
    this.post.key = newPostKey;
    var updates = {};
    updates["/Suggestions/" + newPostKey] = this.post;
    firebase
      .database()
      .ref()
      .update(updates);
    console.log("added new suggestion..");
    this.router.navigate(["/home"]);
  }

  ngOnInit() {}
}
