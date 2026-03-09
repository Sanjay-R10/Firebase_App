import { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

const signup = async () => {
  try {
    setLoading(true);
    setError("");

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      createdAt: new Date(),
    });

  } catch (err) {
    setError(err.message);
  }
  setLoading(false);
};

const login = async () => {
  try {
    setLoading(true);
    setError("");

    await signInWithEmailAndPassword(auth, email, password);

  } catch (err) {
    setError(err.message);
  }

  setLoading(false);
};


  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
     <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-80">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Firebase Login
        </h2>

        {user ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Welcome, {user.email}
            </p>
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-red-500 text-sm mb-3">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={signup}
                disabled={loading}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              >
                {loading ? "Loading..." : "Signup"}
              </button>

              <button
                onClick={login}
                disabled={loading}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default App;