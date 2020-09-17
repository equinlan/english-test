import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  private wieItemIdsAnswers: { [key: string]: boolean } = {};

  constructor() { }

  correct(itemId: string): boolean {
    if (itemId in this.wieItemIdsAnswers) {
      return this.wieItemIdsAnswers[itemId];
    } else {
      return null;
    }
  }
  
  answered(itemId: string): boolean {
    return itemId in this.wieItemIdsAnswers;
  }

  perfect(reset: boolean = true): boolean {
    // Was every answer correct?
    return Object.values(this.wieItemIdsAnswers).every(answer => answer);
  }

  reset(): void {
    this.wieItemIdsAnswers = {}
  }
  
  save(itemId: string, correct: boolean): void {
    this.wieItemIdsAnswers[itemId] = correct;
  }
}
