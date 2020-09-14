import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-starter',
  templateUrl: './test-starter.component.html',
  styleUrls: ['./test-starter.component.scss']
})
export class TestStarterComponent implements OnInit {
  @Input() testIds: string[];
  @Input() action: string;
  currentUser$: Observable<firebase.User>;

  constructor(
    private router: Router,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.auth.user;
  }

  onStart(): void {
    // Navigate to test view
    this.router.navigateByUrl('/test', { state: { testIds: this.testIds } });
  }

}
