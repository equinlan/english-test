import * as firebase from 'firebase/app';

export class Challenge {
    id?: string;
    started_at: firebase.firestore.Timestamp;
    ended_at: firebase.firestore.Timestamp = null;
    completed: boolean = false;
    score: number; // User's score as of arrival at this node
    wieItemIds: string[];

    constructor(score: number, wieItemIds: string[]) {
        this.started_at = firebase.firestore.Timestamp.now();
        this.score = score;
        this.wieItemIds = wieItemIds;
    }
}
