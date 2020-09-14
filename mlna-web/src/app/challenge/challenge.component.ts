import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { WieItem } from '../wie-item';
import { Subject, Observable, of, zip } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AnswersService } from '../answers.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit, OnChanges {
  @Input() wieItem: WieItem;
  @Output() completed = new EventEmitter<boolean>();
  timeout: number = 13000;
  timerValue$: Subject<number> = new Subject<number>();
  timerInterval: number;
  randomState: 0 | 1 = 0;
  userIsAnonymous$: Observable<boolean>;
  correctHtml$: Observable<string>;
  incorrectHtml$: Observable<string>;

  constructor(
    private auth: AngularFireAuth,
    private answersService: AnswersService
    ) { }
  
  ngOnChanges(): void {
    // Show new item when the item input changes
    this.showItem();
  }

  ngOnInit(): void {
  }

  showItem(): void {
    // See if user is anonymous
    this.userIsAnonymous$ = this.auth.user.pipe(
      map(user => user.isAnonymous)
    );

    // Initialize random state for challenge order
    this.randomState = <0 | 1>Math.round(Math.random());

    // Initialize timer
    let startedAt: number = Date.now();
    this.timerValue$.next(0);

    // Update timer
    this.timerInterval = window.setInterval(() => {
      // Update timer value
      this.timerValue$.next((Date.now() - startedAt) / this.timeout * 100);

      // End
      if (Date.now() - startedAt >= this.timeout) {
        window.clearInterval(this.timerInterval);
        this.onTimeout();
      }
    }, 100);

    // Get display HTML for item text
    this.correctHtml$ = zip(
      of(this.getSideHtml(true)),
      this.userIsAnonymous$
    ).pipe(
      map(([html, isAnonymous]) => {
        // Add hints if user isn't anonymous
        if (!isAnonymous) {
          html += " (CORRECT)";
        }
        return html;
      })
    )
    this.incorrectHtml$ = zip(
      of(this.getSideHtml(false)),
      this.userIsAnonymous$
    ).pipe(
      map(([html, isAnonymous]) => {
        // Add hints if user isn't anonymous
        if (!isAnonymous) {
          html += " (INCORRECT)";
        }
        return html;
      })
    )
  }
  
  onAnswer(correct: boolean): void {
    // Clear timer
    window.clearInterval(this.timerInterval);
    
    // Report answer
    this.answersService.save(this.wieItem.id, correct);

    // Report completion
    this.completed.emit(correct);
  }

  onTimeout(): void {
    // Clear timer
    window.clearInterval(this.timerInterval);

    // Report timeout
    this.completed.emit(false);
  }

  getSideHtml(correct: boolean): string {
    // Get WIE item data
    let input = correct ? this.wieItem.correct_text : this.wieItem.incorrect_text;
    let splitInput: string[] = input.split(/[\[\]]/);
    
    // Insert mark tags if brackets exist
    let output: string = input;
    if (splitInput.length == 3) {
      output = splitInput[0]
        + "<mark>"
        + splitInput[1]
        + "</mark>"
        + splitInput[2];
    }

    return output;
  }
}
