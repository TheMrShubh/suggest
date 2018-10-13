import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  suggestions: any;
  constructor(public db: AngularFireDatabase) {
    console.log("here");
    db.list("/Suggestions")
      .valueChanges()
      .subscribe(val => {
        this.suggestions = val;
      });
  }

  printSuggestions() {
    console.log(this.suggestions);
  }

  ngOnInit() {}
}
