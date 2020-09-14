import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WieItem } from '../wie-item';
import { AnswersService } from '../answers.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit {
  @Input() wieItems: WieItem[];
  @Output() completed: EventEmitter<number> = new EventEmitter<number>();
  currentIndex: number = 0;
  correctAnswers: number = 0;
  totalAnswers: number = 0;

  constructor(private answersService: AnswersService) { }

  ngOnInit(): void {
    // If first question already answered, move on
    this.checkIfAnswered();
  }

  checkIfAnswered(): void {
    // If already answered, move on
    let itemId: string = this.wieItems[this.currentIndex].id;
    if (this.answersService.answered(itemId)) {
      this.onAnswered(this.answersService.correct(itemId));
    }
  }

  onAnswered(correct: boolean): void {
    // Increment correct and total answers
    this.correctAnswers += correct ? 1 : 0;
    this.totalAnswers += 1;

    // If last item, report completion
    if (this.currentIndex + 1 >= this.wieItems.length) {
      this.completed.emit(this.correctAnswers / this.totalAnswers);
    } else {
      // Increment current item index
      this.currentIndex += 1;

      // Check if next item is already answered
      this.checkIfAnswered();
    }
  }

}
