// Import the functions you need from the SDKs you need
import {getFirestore, collection,getDocs,onSnapshot,addDoc, setDoc, updateDoc, deleteDoc,doc,query,where,orderBy,serverTimestamp}from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,onAuthStateChanged}from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//init firebase app
initializeApp(firebaseConfig);
const auth = getAuth();
// const auth = firebase.auth();

//init firestore service
const db = getFirestore();

//collection references
const colRef = collection(db, "abonamente");
const colRef2 = collection(db, "servicii");
const colRef3 = collection(db, "Comentarii");
// const AbonamentRosu = doc(db, "abonamente", "cXCYjkDRwn31skev4dP9");
// const AbonamentGalben = doc(db, "abonamente", "Fi8NsCS9vobd5cxURAyi");
// const AbonamentVerde = doc(db, "abonamente", "kl2WoyiHJoEbBlP2UPi7");

//get collection data
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



//add document
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
})


// update subscription info
// const updateComentForm = document.querySelector('.update')
// updateComentForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   await updateDoc(Fi8NsCS9vobd5cxURAyi, {
//     regions: arrayUnion(
//       "nume: " addComentForm.nume.value,
//     "prenume: " addComentForm.prenume.value
//       )
// });

// })

//update document
updateComentForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef=doc(db,"abonamente",updateForm.id.value)
  updateDoc(docRef, {


})});
//delete document
const deleteComentForm = document.querySelector('.delete')
deleteComentForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef=doc(db,"utilizatori",deleteComentForm.id.value)

  deleteDoc(docRef)
    .then(() => {
        deleteComentForm.reset()
    })
})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
      // signupForm.reset()
      const modal = document.querySelector('#modal-signup')
      M.Modal.getInstance(modal).close()
      signupForm.reset()
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
    console.log('user signed out')
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
    console.log('user logged in: ', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
});

