import React, { useState } from "react";
import { signInWithGoogle } from "../services/firebase";
import ImageLogin from "../assets/alpackatwo.png";

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

      if (err.code === "auth/unauthorized-domain") {
        const domain = window.location.hostname;
        setError(
          `Dominio no autorizado: ${domain}. Agregalo en Firebase Console.`,
        );
      } else {
        setError("No se pudo iniciar sesión. Intenta de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#FCFAF7] text-[#383838]">
      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
      `}</style>

      {/* Background decoration elements - Warm & Subtle */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#E7E5E4] rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D6D3D1] rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        {/* Header / Logo */}
        <div className="mb-8 text-2xl font-['Source_Serif_4',serif] text-[#242424] tracking-tight font-medium animate-slide-up">
          Alpacka.ai
        </div>
        
        {/* Mascot Image */}
        <div className="mb-8 relative animate-slide-up delay-100">
          <img
            src={ImageLogin}
            alt="Alpacka Mascot"
            className="w-48 h-48 object-cover rounded-2xl mix-blend-multiply opacity-90 grayscale-[0.1]"
          />
        </div>
        
        {/* Beta Tag */}
        <div className="mb-6 animate-slide-up delay-200">
          <span className="bg-[#F0F0F0] text-[#656565] border border-[#E5E5E5] text-xs px-3 py-1 rounded-full uppercase tracking-wider font-['Inter',sans-serif] font-medium">
            Beta Preview
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl text-[#242424] mb-6 leading-tight font-['Source_Serif_4',serif] font-medium tracking-tight animate-slide-up delay-300">
          Genera tus indicaciones
          <br />
          de IA con un solo click.
        </h1>

        {/* Login Area (Styled as the Input Field from Claude) */}
        <div className="w-full max-w-[480px] mt-8 animate-slide-up delay-400">
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#E5E5E5] p-2 pl-6 flex items-center justify-between transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-[#D4D4D4] group">
            <span className="text-[#A8A8A8] text-lg truncate mr-4 font-['Source_Serif_4',serif] italic">
              Comienza tu idea aquí...
            </span>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="bg-[#242424] hover:bg-[#171717] text-white rounded-xl p-3 px-5 transition-all flex items-center gap-3 flex-shrink-0 font-['Inter',sans-serif] font-medium text-sm shadow-sm"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <div className="bg-white rounded-full p-0.5">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 4.66c1.61 0 3.1.56 4.28 1.6l3.2-3.2C17.45 1.25 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>
                  <span className="hidden sm:inline">Entrar con Google</span>
                  <span className="sm:hidden">Entrar</span>
                </>
              )}
            </button>
          </div>
          
          {error && (
            <p className="mt-4 text-[#DA7756] text-sm bg-[#FFF4F0] p-3 rounded-lg border border-[#F0E0DA] font-['Inter',sans-serif]">
              {error}
            </p>
          )}
          
          <p className="mt-6 text-[#9CA3AF] text-sm font-['Inter',sans-serif]">
            Inicia sesión para acceder al optimizador profesional.
          </p>
        </div>
      </div>
    </div>
  );
};