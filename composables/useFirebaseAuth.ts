import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const useFirebaseAuth = () => {

    const { $auth } = useNuxtApp()

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword($auth, email, password);
            const user = userCredential.user;
            // console.log(user)
        } catch (error) {
            console.log(error)
        }
    };

    const signout = async () => {

        const toast = useToast()
        try {
            await signOut($auth)
            await navigateTo('/login')
        
        } catch (error) {
            console.log(error)
        }
    };

    const curretnUserPromise = () => new Promise( (resolve, reject) => {
        const unsubscribe = onAuthStateChanged($auth, (user) => {
            unsubscribe()
            resolve(user)
        }, reject)
    });

    const currentUser = $auth.currentUser;

    return {
        login,
        signout,
        curretnUserPromise,
        currentUser
    }
}