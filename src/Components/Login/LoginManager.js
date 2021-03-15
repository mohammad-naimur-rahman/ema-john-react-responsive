import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            const { displayName, photoURL, email } = result.user;
            const signedInUser = {
                isSignedin: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;

        })
        .catch(err => {
            console.log(err.message);
        })
}

export const handleFbSignin = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            var user = result.user;
            user.success = true;
            return user;
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}

export const handleSignOut = () => {
    return firebase.auth().signOut().then((res) => {
        const signedOutUser = {
            isSignedin: false,
            name: '',
            email: '',
            photo: '',
            success: false
        }
        return signedOutUser;
    }).catch((error) => {
        alert('An error happened');
    });
}

export const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    }).then(function () {
        console.log('user updated');
    }).catch(function (error) {
        console.log(error);
    });
}


export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}