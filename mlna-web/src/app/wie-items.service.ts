import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WieItem } from './wie-item';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class WieItemsService {

  constructor(private afs: AngularFirestore) { }

  find(wieItemIds: string[]): Observable<WieItem[]> {
    return this.afs.collection<WieItem>('wie_items', ref => ref.where(firebase.firestore.FieldPath.documentId(), 'in', wieItemIds))
    .snapshotChanges()
    .pipe(
      map(items => {
        return <[WieItem]>items.map(item => <WieItem>{
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        });
      })
    );
  }
}
