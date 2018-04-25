var config = {
    apiKey: "AIzaSyDxwPt-wLBzohVENsOivD28rMj-7KS0BWg",
    authDomain: "senior-society.firebaseapp.com",
    databaseURL: "https://senior-society.firebaseio.com",
    projectId: "senior-society",
    storageBucket: "",
    messagingSenderId: "118045466542"
};
// Initialize the default app
var defaultApp = firebase.initializeApp(config);
console.log(defaultApp.name);  // "[DEFAULT]"
// You can retrieve services via the defaultApp variable...
//var defaultStorage = defaultApp.storage();
var defaultDatabase = defaultApp.database();
/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
        });
        // [END authwithemail]
    }
    //document.getElementById('quickstart-sign-in').disabled = true;
}
/**
 * Handles the sign up button press.
 */
function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END createwithemail]
}
/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
    });
    // [END sendemailverification]
}
function sendPasswordReset() {
    var email = document.getElementById('email').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
}
function signOut() {
    console.log("in sign out");
    if (firebase.auth().currentUser) {
        console.log("in if");
        // [START signout]
        firebase.auth().signOut();
        window.location = 'index.html';
        // [END signout]
    }
}
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        //document.getElementById('quickstart-verify-email').disabled = true;
        if (user) {
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            if (!emailVerified) {
                //document.getElementById('quickstart-verify-email').disabled = false;
            }
            window.location = "newsfeed.html";
        } else {
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
        }
        // [START_EXCLUDE silent]
        //document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
    });
    if (document.getElementById('quickstart-sign-in')!= null) {
        document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    }
    if (document.getElementById('quickstart-sign-up')!= null) {
        document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    }
    if (document.getElementById('quickstart-sign-out')!= null) {
        document.getElementById('quickstart-sign-out').addEventListener('click', signOut, false);
    }
    if (document.getElementById('quickstart-verify-email')!= null) {
        document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    }
    if (document.getElementById('quickstart-password-reset')!= null) {
        document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
    }
}
window.onload = function() {
    initApp();
};