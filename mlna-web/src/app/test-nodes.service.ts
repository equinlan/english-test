import { Injectable, assertPlatform } from '@angular/core';
import { TestNode } from './test-node';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestNodesService {
  testsCollection: AngularFirestoreCollection<TestNode>;

  constructor(private afs: AngularFirestore) {
    this.testsCollection = afs.collection('tests');
  }

  find(testId: string, nodeId: string): Observable<TestNode> {
    return this.testsCollection
      .doc(testId)
      .collection('nodes')
      .doc<TestNode>(nodeId)
      .valueChanges()
      .pipe(
        take(1)
      );
  }
}
