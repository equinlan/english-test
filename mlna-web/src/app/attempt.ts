import * as firebase from 'firebase/app';

export class Attempt {
    public id?: string;
    public completed: boolean = false;
    public started_at: firebase.firestore.Timestamp;
    public user_id: string;
    public score: number = null;
    public cheating: boolean = false;

    constructor(userId: string) {
        this.started_at = firebase.firestore.Timestamp.now();
        this.user_id = userId;
    }
}
