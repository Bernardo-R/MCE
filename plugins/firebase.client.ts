import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig()

const firebaseConfig = {
    apiKey: "AIzaSyCELWs_mD6SATTp-fIpyB-AW25IUI59mtU",
    authDomain: "marycargoexpress-a92f9.firebaseapp.com",
    projectId: "marycargoexpress-a92f9",
    storageBucket: "marycargoexpress-a92f9.appspot.com",
    messagingSenderId: "192337920653",
    appId: "1:192337920653:web:46bcea586399af4986d8c4"
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app);

  

  return {
    provide: {
        auth,
        db,
    }
  }
})