import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import * as firebase from "firebase/app";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from "@angular/router";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"]
})
export class GraphComponent implements OnInit {
  suggestions: any;
  x_suggestions = [];
  y_likes = [];
  chart = [];
  canGenerate = true;
  constructor(public db: AngularFireDatabase, private router: Router) {
    db.list("/Suggestions")
      .valueChanges()
      .subscribe(suggestion => {
        this.suggestions = suggestion;
      });
  }

  goHome() {
    this.router.navigate(["/home"]);
  }

  getArray() {
    if (this.canGenerate) {
      for (let suggestion of this.suggestions) {
        this.x_suggestions.push(suggestion.title);
        this.y_likes.push(suggestion.likes);
      }
      console.log(this.x_suggestions);
      console.log(this.y_likes);
    }
    this.canGenerate = false;
    this.calculateGraph();
  }

  calculateGraph() {
    this.chart = new Chart("canvas", {
      type: "line",
      data: {
        labels: this.x_suggestions,
        datasets: [
          {
            data: this.y_likes,
            borderColor: "#e91e63",
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              display: true
            }
          ]
        }
      }
    });
  }

  ngOnInit() {}
}
