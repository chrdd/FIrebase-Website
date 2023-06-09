import { initializeApp } from "firebase/app";
import {getFirestore, collection,getDocs,onSnapshot,addDoc, setDoc, updateDoc, deleteDoc,doc,query,where,orderBy,serverTimestamp,getDoc}from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,onAuthStateChanged,updateProfile}from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWF3fdivIjXZRSPVASQCxmZyiC2ZWGsFU",
  authDomain: "club-sportiv-3439e.firebaseapp.com",
  databaseURL: "https://club-sportiv-3439e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "club-sportiv-3439e",
  storageBucket: "club-sportiv-3439e.appspot.com",
  messagingSenderId: "1006188733621",
  appId: "1:1006188733621:web:beb7efb3d08ad202b9cafc",
  measurementId: "G-CJVN06MEKC"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, "abonamente");
const colRef2 = collection(db, "servicii");
const colRef3 = collection(db, "comentarii");


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});


// realtime collection data
getDocs(colRef)
  .then(snapshot => {
    // console.log(snapshot.docs)
    let abonamente = []
    snapshot.docs.forEach(doc => {
      abonamente.push({ ...doc.data(), id: doc.id })
    })
    console.log(abonamente)
  })
  .catch(err => {
    console.log(err.message)
  })


getDocs(colRef2)
    .then(snapshot => {
    // console.log(snapshot.docs)
    let servicii = []
    snapshot.docs.forEach(doc => {
      servicii.push({ ...doc.data(), id: doc.id })
    })
    console.log(servicii)
  })
  .catch(err => {
    console.log(err.message)
  })
  
onSnapshot(colRef3, (snapshot) => {
    let Comentarii = []
    snapshot.docs.forEach(doc => {
        Comentarii.push({ ...doc.data(), id: doc.id })
    })
    console.log(Comentarii)
})

// adding docs
const addComentForm = document.querySelector('.add')
addComentForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef3, {
    nume: addComentForm.nume.value,
    prenume: addComentForm.prenume.value,
    comentariu: addComentForm.comentariu.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addComentForm.reset()
  })
});

// signing users up

const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const name = signupForm.name.value
  const email = signupForm.email.value
  const password = signupForm.password.value
  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .then(() => {
      const docRef = addDoc(collection(db, "utilizatori"), {
        nume: name,
        email: email,
      });
      
    })
    .catch(err => {
      console.log(err.message)
    })
})



// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
    //   console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
    //   console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})


// subscribing to auth changes
const accountDetails = document.querySelector('.account-details');
const subAuth = onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('user logged in:', user)
    const html = `
      <div>Conectat cu adresa ${user.email}</div>
    `;
    accountDetails.innerHTML = html;
  }
  else {
    console.log('user logged out')
  }
})





// // unsubscribing from changes (auth & db)
// const unsubButton = document.querySelector('.unsub')
// unsubButton.addEventListener('click', () => {
//   console.log('unsubscribing')
//   unsubCol()
//   unsubDoc()
//   unsubAuth()
// })