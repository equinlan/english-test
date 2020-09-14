import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentsService } from '../comments.service';
import { FeedbackComponent } from '../feedback/feedback.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-test-summary',
  templateUrl: './test-summary.component.html',
  styleUrls: ['./test-summary.component.scss']
})
export class TestSummaryComponent implements OnInit, OnChanges {
  @Input() score: number;
  @Input() testTime: number;
  comment: string;
  gaveFeedback: boolean = false;
  testMinutes: number = 0;

  constructor(
    public dialog: MatDialog,
    private commentsService: CommentsService,
    private auth: AngularFireAuth
  ) { }

  ngOnChanges(): void {
    this.testMinutes = Math.ceil(this.testTime / 1000 / 60);
  }
  
  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      width: '320px',
      data: this.comment
    });

    dialogRef.afterClosed().subscribe(result => {
      // Set gave feedback switch to true
      this.gaveFeedback = true;

      // Save comment
      this.comment = result;

      // Create comment in database
      this.auth.currentUser.then(currentUser => {
        this.commentsService.create(currentUser.uid, result);
      });
    });
  }

}
