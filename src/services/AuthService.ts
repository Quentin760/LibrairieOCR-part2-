import * as firebase from 'firebase';

export class authService {

    isAuth = false;

    constructor () {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.isAuth = true;
            } else {
                this.isAuth = false;
            }
        });
    }

    signUpUser(email: string, password: string) {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password).then(
                (user) => {
                    resolve(user);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    signInUser(email: string, password: string) {
        return new Promise((resolve, reject) => {
            firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password).then(
                (user) => {
                    resolve(user);
                },
                (error) => {
                    reject(error)
                }
            );
        });
    }
    signOut() {
        firebase.auth().signOut();
    }
}