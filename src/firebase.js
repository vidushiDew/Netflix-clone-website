
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { addDoc,collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDQz203X_MG1OMa6SffLIWi6LLEv5VX0mc",
  authDomain: "netflix-clone-a4278.firebaseapp.com",
  projectId: "netflix-clone-a4278",
  storageBucket: "netflix-clone-a4278.firebasestorage.app",
  messagingSenderId: "1075649530612",
  appId: "1:1075649530612:web:4ddbccea0793aeadd76ca1"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db =getFirestore(app);

const signup = async (name,email ,password)=>{
    try{
        const res= await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider : "local",
            email,

        });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login =async (email,password) =>{
    try {
       await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }

}

const logout= ()=> {
    signOut (auth);

}

export {auth,db,login,signup,logout};