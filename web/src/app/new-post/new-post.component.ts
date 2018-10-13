import { Component, OnInit } from "@angular/core";
import { NewPost } from "../NewPost";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.css"]
})
export class NewPostComponent implements OnInit {
  post: NewPost;
  today: Date;

  constructor() {
    this.post = new NewPost();
    this.today = new Date();
    this.post.date = this.today.getDate();
  }

  ngOnInit() {}
}
