import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Challenge } from './challenge';
import { Attempt } from './attempt';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {
  testsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.testsCollection = afs.collection('tests');
  }

  create(attemptId: string, score: number, wieItemIds: string[]): Observable<Challenge> {
    // Set test id
    let testId: string = "test_0";

    // Create new challenge
    let newChallenge = new Challenge(score, wieItemIds);
    return from(this.afs
        .collection('tests')
        .doc(testId)
        .collection<Attempt>('attempts')
        .doc<Attempt>(attemptId)
        .collection<Challenge>('challenges')
        .add(<Challenge>{ ...newChallenge })
      )
      .pipe(
        map(challenge => <Challenge>{
          id: challenge.id,
          ...newChallenge
        }),
        take(1)
      );
  }

  update(
    attemptId: string,
    challengeId: string,
    data: Challenge
  ): void {
    // Set test id
    let testId: string = "test_0";

    // Work on a copy of data
    let editedChallenge = <Challenge>{ ...data };

    // Remove id
    if (editedChallenge.id) delete editedChallenge.id;

    // Update database
    this.testsCollection
      .doc(testId)
      .collection<Attempt>('attempts')
      .doc<Attempt>(attemptId)
      .collection<Challenge>('challenges')
      .doc<Challenge>(challengeId)
      .update(<Challenge>{ ...editedChallenge });
  }
}
