import React, { useContext, useState, useEffect } from 'react';
import db, { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, firstName, lastName) {
    try {
      return auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          db.ref(`users/${user.user.uid}/userName/`).set({
            firstName: firstName,
            lastName: lastName,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
