import * as firebase from 'firebase/app';

export class FeedbackComment {
    userId: string;
    text: string;
    createdAt: firebase.firestore.Timestamp;

    constructor(userId: string, text: string) {
        this.userId = userId;
        this.text = text;
        this.createdAt = firebase.firestore.Timestamp.now();
    }
}
