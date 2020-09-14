import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AttemptsService } from '../attempts.service';
import { Attempt } from '../attempt';
import { Observable, combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap, takeWhile, filter, map } from 'rxjs/operators';
import { TestNodesService } from '../test-nodes.service';
import { TestNode } from '../test-node';
import { WieItem } from '../wie-item';
import { WieItemsService } from '../wie-items.service';
import { Challenge } from '../challenge';
import { ChallengesService } from '../challenges.service';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

type ChallengeInfo = {
  challenge: Challenge,
  testNode: TestNode,
  wieItems: WieItem[]
};

@Component({
  selector: 'app-proctor',
  templateUrl: './proctor.component.html',
  styleUrls: ['./proctor.component.scss']
})
export class ProctorComponent implements OnInit, OnChanges {
  @Input() testId: string;
  @Output() completed = new EventEmitter<number>();
  currentChallengeInfo$: Observable<ChallengeInfo>;
  attempt: Attempt;

  constructor(
    private attemptsService: AttemptsService,
    private router: Router,
    private testNodesService: TestNodesService,
    private wieItemsService: WieItemsService,
    private challengesService: ChallengesService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void { 
  }

  ngOnChanges(): void {
    this.createAttempt();
  }

  createAttempt(): void {
    // Create attempt and mark as cheating if user is admin
    this.auth.user
    .pipe(
      filter(user => user != null),
      switchMap(user => this.attemptsService.create(this.testId, !user.isAnonymous))
    )    
    .subscribe(
      attempt => {
        // Save attempt
        this.attempt = attempt;

        // Show first challenge
        this.bucketChallenge('0') // The first node should be 0
      },
      err => {
        // Print error
        console.error(err);

        // Navigate to home
        this.router.navigateByUrl('/');
      }
    );
  }

  bucketChallenge(nodeId: string): void {
    // Get current node
    const currentNode$ = this.testNodesService.find(this.testId, nodeId);
    currentNode$.subscribe(currentNode => {
      // Update attempt score
      this.attempt.score = currentNode.value;

      // End test if leaf
      if (currentNode.greater_child === null || currentNode.less_equal_child === null) {
        // Update attempt completion indicator
        this.attempt.completed = true;
        
        // Report completion
        this.completed.emit(currentNode.value);
      }

      // Save updated attempt
      this.attemptsService.update(this.testId, this.attempt.id, this.attempt);
    });
    
    // Get current WIE items
    const currentWieItems$: Observable<WieItem[]> = currentNode$
      .pipe(
        takeWhile(currentNode => currentNode.greater_child != null && currentNode.less_equal_child != null),
        switchMap(currentNode => {
          return this.wieItemsService.find(currentNode.wie_item_ids);
        })
      );

    // Create challenge
    const currentChallenge$: Observable<Challenge> = combineLatest([
      currentNode$,
      currentWieItems$
    ]).pipe(
      switchMap(info => {
        let node = info[0];
        let wieItems = info[1];
        let wieItemIds = wieItems.map(item => item.id);
        return this.challengesService.create(this.testId, this.attempt.id, node.value, wieItemIds);
      })
    )

    // Get challenge info
    this.currentChallengeInfo$ = combineLatest([
      currentChallenge$,
      currentNode$,
      currentWieItems$,
    ]).pipe(
      map(info => <ChallengeInfo>{
        challenge: info[0],
        testNode: info[1],
        wieItems: info[2]
      })
    );
  }

  onAnswered(challengeInfo: ChallengeInfo, percentCorrect: number): void {       
    // Update challenge data
    challengeInfo.challenge.ended_at = firebase.firestore.Timestamp.now();
    challengeInfo.challenge.completed = true;
    
    // Save updated challenge
    this.challengesService.update(
      this.testId,
      this.attempt.id,
      challengeInfo.challenge.id,
      challengeInfo.challenge);

    // Show next challenge
    this.bucketChallenge(percentCorrect > challengeInfo.testNode.threshold
      ? challengeInfo.testNode.greater_child
      : challengeInfo.testNode.less_equal_child);
  }
}
