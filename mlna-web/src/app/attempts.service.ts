import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Attempt } from './attempt';
import { Observable, throwError } from 'rxjs';
import { switchMap, map, catchError, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AttemptsService {
  testsCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.testsCollection = afs.collection('tests');
  }

  create(testId: string, cheating: boolean = false): Observable<Attempt> | Observable<never> {
    // Start attempt
    let newAttempt;
    return this.auth.user
    .pipe(
      switchMap(currentUser => {
        newAttempt = new Attempt(currentUser.uid)
        newAttempt.cheating = cheating;
        return this.testsCollection.doc(testId).collection<Attempt>('attempts').add({ ...newAttempt })
      }),
      catchError(err => throwError(err)),
      map(attempt => {
        return <Attempt>{
          id: attempt.id,
          ...newAttempt
        };
      }),
      take(1)
    )
  }

  update(testId: string, attemptId: string, data: Attempt): void {
    // Work on a copy of data
    let editedAttempt = <Attempt>{ ...data };

    // Remove id
    if (editedAttempt.id) delete editedAttempt.id;

    // Update database
    this.testsCollection
      .doc(testId)
      .collection<Attempt>('attempts')
      .doc<Attempt>(attemptId)
      .update(editedAttempt);
  }
}
