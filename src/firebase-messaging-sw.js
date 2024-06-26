importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

const firebaseConfig = {
  // to cut the chase, just copy it from your Firebase Project settings
  apiKey: "AIzaSyAqKcpZfo7oHhMt6KkiY9llKEktOQG5D0Y",
  authDomain: "icsms-call-backend-7d40c.firebaseapp.com",
  projectId: "icsms-call-backend-7d40c",
  storageBucket: "icsms-call-backend-7d40c.appspot.com",
  messagingSenderId: "821061641586",
  appId: "1:821061641586:web:063e3571660ab1c72569eb",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
});
