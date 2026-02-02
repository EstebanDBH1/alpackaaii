import React, { useState } from 'react';
import { signInWithGoogle } from '../services/firebase';
import ImageLogin from '../assets/alpackatwo.png'

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error("Login Error:", err);
      
      if (err.code === 'auth/unauthorized-domain') {
        const domain = window.location.hostname;
        setError(`Dominio no autorizado: ${domain}. Agregalo en Firebase Console.`);
      } else {
        setError("No se pudo iniciar sesión. Intenta de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-2xl flex flex-col items-center text-center animate-fadeIn">
        
        {/* Header / Logo */}
        <div className="mb-8 text-2xl text-gray-900 tracking-tight">
          Alpacka.ai
        </div>
        {/* Mascot Image (Placeholder Style) */}
        <div className="mb-8 relative">
          <img 
            src={ImageLogin} 
            alt="Alpacka Mascot" 
            className="w-48 h-48 object-cover rounded-2xl mix-blend-multiply" 
          />
        </div>
        {/* Beta Tag */}
        <div className="mb-6">
           <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full uppercase tracking-wider">
             Beta
           </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-3xl text-gray-900 mb-4 leading-tight font-serif ">
          Genera tus indicaciones<br/>
          de IA con un solo click.
        </h1>

        {/* Login Area (Styled as the Input Field from the image) */}
        <div className="w-full max-w-md mt-8">
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 p-2 pl-6 flex items-center justify-between transition-transform hover:scale-[1.01] duration-300">
                <span className="text-gray-400 text-lg truncate mr-4">
                    Comienza tu idea aquí...
                </span>
                <button 
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-2xl p-3 px-6 transition-colors flex items-center gap-2 flex-shrink-0"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
                                <path d="M12 4.66c1.61 0 3.1.56 4.28 1.6l3.2-3.2C17.45 1.25 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="hidden sm:inline">Entrar con Google</span>
                            <span className="sm:hidden">Entrar</span>
                        </>
                    )}
                </button>
            </div>
             {error && (
                <p className="mt-4 text-red-500 text-sm bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>
            )}
            <p className="mt-4 text-gray-400 text-sm">
                Inicia sesión para acceder al optimizador profesional.
            </p>
        </div>
      </div>
    </div>
  );
};