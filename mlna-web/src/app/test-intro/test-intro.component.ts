import { Component, OnInit } from '@angular/core';
import { TestsService } from '../tests.service';

@Component({
  selector: 'app-test-intro',
  templateUrl: './test-intro.component.html',
  styleUrls: ['./test-intro.component.scss']
})
export class TestIntroComponent implements OnInit {
  tests: string[];

  constructor(private testsService: TestsService) { }

  ngOnInit(): void {
    this.tests = this.testsService.getTests();
  }

}
