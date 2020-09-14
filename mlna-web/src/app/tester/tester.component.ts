import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { InstructionsComponent } from '../instructions/instructions.component';
import { AnswersService } from '../answers.service';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss']
})
export class TesterComponent implements OnInit {
  completed: boolean = false;
  scores: number[] = [];
  scoreTotal: number = 0;
  currentTextIdx: number = 0;
  currentTestId: string;
  testIds: string[]
  readInstructions: boolean = false;
  startTime: number = 0;
  endTime: number = 0;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private answersService: AnswersService
  ) { }

  ngOnInit(): void {
    // Show instructions
    this.openDialog();

    // Get test id
    this.activatedRoute.paramMap
      .pipe(
        map(() => <string[]>window.history.state['testIds']),
        take(1)
      )
      .subscribe(
        testIds => {
          // Handle no test ids or save test ids
          if (!testIds || testIds.length == 0) {
            // Print error
            console.warn('Test ids are undefined.');

            // Close dialog
            this.dialog.closeAll();

            // Navigate to home
            this.router.navigateByUrl('/');
          } else {
            // Save test ids
            this.testIds = testIds;

            // Handle no test id or set current test index
            let currentTestId: string = testIds[this.currentTextIdx];
            if (!currentTestId) {
              // Print error
              console.warn('First test id is undefined.');

              // Close dialog
              this.dialog.closeAll();

              // Navigate to home
              this.router.navigateByUrl('/');
            } else {
              // Set current test index
              this.currentTestId = currentTestId;

              // Start timer
              this.startTime = Date.now();
            }
          }
        }
      );
  }

  onCompleted(score: number): void {
    // Save score
    this.scores.push(score);
    this.scoreTotal += score;

    // Increment text index
    this.currentTextIdx += 1;

    // Mark all tests as completed or start next child test
    if (this.currentTextIdx >= this.testIds.length) {
      // Set end time
      this.endTime = Date.now();
      
      // Mark all tests as completed
      this.completed = true;
    } else {
      // Handle error or start next test
      let nextTestId: string = this.testIds[this.currentTextIdx]
      if (!nextTestId) {
        // Print error
        console.warn('Next test id is undefined.');

        // Close dialog
        this.dialog.closeAll();

        // Navigate to home
        this.router.navigateByUrl('/');
      } else {
        // Start next test
        this.currentTestId = nextTestId;
      }
    }
  }

  openDialog() {
    // Show instructions
    const dialogRef = this.dialog.open(InstructionsComponent, {
      width: '320px'
    });

    // Mark instructions as read after closing
    dialogRef.afterClosed().subscribe(() => this.readInstructions = true);
  }

  perfect(): boolean {
    return this.answersService.perfect()
  }
}
