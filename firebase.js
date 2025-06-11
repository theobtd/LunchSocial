// firebase.js
const firebaseConfig = {
    apiKey: "AIzaSyBB61hJK8iHNAXz2q5u8ghGqIFMyJh-Nho",
    authDomain: "aperosocial-d53c7.firebaseapp.com",
    databaseURL: "https://aperosocial-d53c7-default-rtdb.firebaseio.com",
    projectId: "aperosocial-d53c7",
    storageBucket: "aperosocial-d53c7.appspot.com",
    messagingSenderId: "954205055992",
    appId: "1:954205055992:web:c2ebebe1c0ac210163440d"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
