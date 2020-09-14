import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, filter } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userIsAnonymous$: Observable<boolean>;

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    // See if current user is anonymous
    this.userIsAnonymous$ = this.auth.user.pipe(
      filter(user => user != null),
      map(user => user.isAnonymous)
    );
  }

  onSignOut(): void {
    from(this.auth.signOut())
      .pipe(
        switchMap(() => this.auth.signInAnonymously())
      )
      .subscribe(() => this.router.navigateByUrl('/'));
  }

}
