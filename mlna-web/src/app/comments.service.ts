import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FeedbackComment } from './feedback-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private afs: AngularFirestore) { }

  create(userId: string, text: string): boolean {
    // Create the comment if it's not empty
    let newComment: FeedbackComment = new FeedbackComment(userId, text);
    if (text) {
      // Create the comment
      this.afs.collection('comments').add(<FeedbackComment>{ ...newComment });
      return true;
    } else {
      // Don't create the comment
      return false;
    }
  }
}
