import React, { useEffect, useState } from 'react';
import { auth, logout } from './services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { PromptOptimizer } from './components/PromptOptimizer';
import { UserProfile } from './types';
import { PromptOptimizer2 } from './components/PromptOpimizer2';


function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Uso de la sintaxis modular: onAuthStateChanged(authInstance, callback)
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="flex-1">
        <PromptOptimizer2/>
      </main>
      <footer className="border-t border-gray-100 py-6 mt-auto bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Alpacka.ai - Powered by Gemini
        </div>
      </footer>
    </div>
  );
}

export default App;