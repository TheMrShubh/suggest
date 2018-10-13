import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { GraphComponent } from "./graph/graph.component";
import { PostComponent } from "./post/post.component";
import { NewPostComponent } from "./new-post/new-post.component";
import { AuthService } from "./auth.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },

  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthService]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "post",
    component: PostComponent
  },
  {
    path: "newpost",
    component: NewPostComponent,
    canActivate: [AuthService]
  },
  {
    path: "analytics",
    component: GraphComponent,
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
