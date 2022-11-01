import { initializeApp } from "firebase/app"
//initializeApp digunakan untuk membuat app instance base of type of config
// config is object
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Firestore,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC3KPrRU0FBUMjoOapecu4U9TX6WnJQBAc",
  authDomain: "crwn-clothing-db-b5021.firebaseapp.com",
  projectId: "crwn-clothing-db-b5021",
  storageBucket: "crwn-clothing-db-b5021.appspot.com",
  messagingSenderId: "773650127982",
  appId: "1:773650127982:web:d91a7f7a78e0c9bb861a7f",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid)

  console.log(userDocRef)

  // Register User
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log("error creating the user", error.message)
    }
  }

  return userDocRef
}
