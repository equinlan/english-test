import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.scss']
})
export class AdminSigninComponent implements OnInit {
  email: string;
  password: string;
  error: string;

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Sign in
    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(
        () => this.router.navigateByUrl("/"),
        error => this.error = error
      );
  }

}
