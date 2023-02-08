import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAnQ0khhQ_aFlA12OMskNItydpUmF40_G0",
  authDomain: "whatsapp-4c851.firebaseapp.com",
  projectId: "whatsapp-4c851",
  storageBucket: "whatsapp-4c851.appspot.com",
  messagingSenderId: "1035042275911",
  appId: "1:1035042275911:web:a742cbab77378a58b92762"
};



//   initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);









/*
  const db = getFirestore();


  const colRef = collection(db,'rooms');

// get collection data

getDocs(colRef)
.then((snapshot) =>{
let rooms = []
snapshot.docs.forEach((doc)=>{
rooms.push({...doc.data(), id: doc.id})
})
console.log(rooms)
})
.catch(err=>{
    console.log(err.message)
})

*/