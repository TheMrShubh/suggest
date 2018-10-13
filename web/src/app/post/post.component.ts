import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { NewPost } from "../NewPost";
import * as firebase from "firebase/app";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  suggestions: any;
  selectedPost: NewPost;
  isOn = 0;
  suggestionID: any[];
  constructor(public db: AngularFireDatabase) {
    console.log("here");
    db.list("/Suggestions")
      .valueChanges()
      .subscribe(suggestion => {
        this.suggestions = suggestion;
        console.log(this.suggestions);
      });
  }

  onSelect(hero: NewPost) {
    this.selectedPost = hero;
    console.log(this.selectedPost);
    this.isOn = 1;
  }

  like() {
    var key = this.selectedPost.key;
    firebase
      .database()
      .ref("/Likes" + key)
      .push(key);
    //var updates = {};
    //updates["/Likes/" + key] = ;
  }

  ngOnInit() {}
}
