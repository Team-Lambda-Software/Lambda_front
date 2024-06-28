importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');

const app=firebase.initializeApp(
  {
    apiKey: "AIzaSyCp7y6c0L-ea3PUOiwxv6tjAZxYgq30jFE",
    authDomain: "myawe-91958.firebaseapp.com",
    projectId: "myawe-91958",
    storageBucket: "myawe-91958.appspot.com",
    messagingSenderId: "415162198994",
    appId: "1:415162198994:web:a00b5775f2f8424304b60b",
  }
)
const messaging=firebase.messaging(app)

