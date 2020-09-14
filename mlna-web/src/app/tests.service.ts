import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  tests: string[] = ['bucket_test_a', 'bucket_test_b']

  constructor() { }

  public getTests(): string[] {
    return this.tests;
  }
}
