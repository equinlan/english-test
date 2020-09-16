import { Component, OnInit } from '@angular/core';
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
  readInstructions: boolean = false;
  startTime: number = 0;
  endTime: number = 0;

  constructor(
    public dialog: MatDialog,
    private answersService: AnswersService
  ) { }

  ngOnInit(): void {
    // Show instructions
    this.openDialog();
  }

  onCompleted(score: number): void {
    // Save score
    this.scores.push(score);
    this.scoreTotal += score;

    // Set end time
    this.endTime = Date.now();
      
    // Mark all tests as completed
    this.completed = true;
  }

  openDialog() {
    // Show instructions
    const dialogRef = this.dialog.open(InstructionsComponent, {
      width: '320px'
    });

    // Mark instructions as read after closing
    dialogRef.afterClosed().subscribe(() => {
      // Set instructions as read
      this.readInstructions = true;

      // Start timer
      this.startTime = Date.now();
    });
  }

  perfect(): boolean {
    return this.answersService.perfect()
  }
}
