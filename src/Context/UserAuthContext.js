import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase-config'

const userAuthContext = createContext()

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState('')
  // console.log('this is user', user.uid ? user.uid : null)
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  function Login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function LogOut() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <userAuthContext.Provider
      value={{ user, signUp, Login, resetPassword, LogOut }}
    >
      {children}
    </userAuthContext.Provider>
  )
}

export function useUserAuth() {
  return useContext(userAuthContext)
}
