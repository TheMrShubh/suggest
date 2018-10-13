import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { take, map } from "rxjs/operators";
import { tap } from "rxjs/internal/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return from(this.auth.authState)
      .pipe(take(1))
      .pipe(map(state => !!state))
      .pipe(
        tap(authenticated => {
          if (!authenticated) this.router.navigate(["/login"]);
        })
      );
  }
}
