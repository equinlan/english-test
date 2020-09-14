import { Component, OnInit } from '@angular/core';
import { TestsService } from '../tests.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  tests: string[];

  constructor(private testsService: TestsService) { }

  ngOnInit(): void {
    this.tests = this.testsService.getTests();
  }

}
