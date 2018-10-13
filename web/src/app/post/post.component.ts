import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { NewPost } from "../NewPost";
import { Comment } from "../Comment";
import * as firebase from "firebase/app";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  suggestions: any;
  admins: any;
  selectedPost: NewPost;
  isOn = 0;
  likes: any;
  comments: any;
  numLikes: number;
  commentText: String;
  user;
  constructor(public db: AngularFireDatabase) {
    console.log("here");
    this.user = firebase.auth().currentUser;
    db.list("/Suggestions")
      .valueChanges()
      .subscribe(suggestion => {
        this.suggestions = suggestion;
        console.log(this.suggestions);
      });
    db.list("/Admins")
      .valueChanges()
      .subscribe(admin => {
        this.admins = admin;
      });
  }

  onSelect(hero: NewPost) {
    this.selectedPost = hero;
    this.numLikes = 0;
    var key = this.selectedPost.key;
    console.log(this.selectedPost);
    this.isOn = 1;
    this.db
      .list("/Likes/" + key)
      .valueChanges()
      .subscribe(like => {
        this.selectedPost.likes = like.length;
        this.updateLikes();
        this.likes = like;
        console.log(this.likes);
      });
    this.db
      .list("/Comments/" + key)
      .valueChanges()
      .subscribe(comment => {
        this.comments = comment;
      });
  }

  like() {
    var doLike = false;
    if (this.likes != undefined) {
      for (let user of this.likes) {
        if (user == firebase.auth().currentUser.uid) {
          doLike = true;
          console.log("Already Liked");
          break;
        }
      }
    }

    if (doLike == false) {
      firebase
        .database()
        .ref("/Likes/" + this.selectedPost.key)
        .push(firebase.auth().currentUser.uid);
      console.log("check");
    }

    //this.selectedPost.likes = this.numLikes;
    this.updateLikes();
  }

  updateLikes() {
    var updates = {};
    updates["/Suggestions/" + this.selectedPost.key] = this.selectedPost;
    firebase
      .database()
      .ref()
      .update(updates);
  }

  comment() {
    var com = new Comment();
    com.body = this.commentText;
    com.uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("/Comments/" + this.selectedPost.key)
      .push(com);
    this.isOn = 1;
  }

  checkAdmin(uid) {
    for (let admin of this.admins) {
      if (admin == uid) {
        return true;
      }
    }
    return false;
  }

  ngOnInit() {}
}
