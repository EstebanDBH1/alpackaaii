import React, { useState, useRef, useEffect } from 'react';
import { optimizePromptWithGemini } from '../services/gemini';
import { Tone, Complexity, PromptRequest, OptimizationResult } from '../types';
import { Button } from './Button';
import ImageLo from "../assets/alpackatwo.png";

export const PromptOptimizer2: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const defaultTone = Tone.PROFESSIONAL;
  const defaultComplexity = Complexity.BALANCED;
  const defaultModel = 'Gemini 2.0 Flash';

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleOptimize = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      const request: PromptRequest = {
        originalPrompt: prompt,
        tone: defaultTone,
        complexity: defaultComplexity,
        targetModel: defaultModel
      };
      const optimized = await optimizePromptWithGemini(request);
      setResult(optimized);
    } catch (error) {
      console.error(error);
      alert("Hubo un error procesando tu solicitud. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 font-sans text-gray-900">
      {/* Header text - Minimalist */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-serif text-gray-900 tracking-tight mb-3">
          Prompt Optimizer
        </h1>
        <p className="text-gray-500 text-sm">
          Permite transformar ideas o borradores en prompts optimizados.
        </p>
      </div>

      {/* Input Area - Claude style (clean box with bottom actions) */}
      <div className="relative mb-12 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl blur opacity-30 transition duration-1000"></div>
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm transition-all focus-within:shadow-md focus-within:border-gray-300">
          <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe lo que quieres lograr..."
              className="w-full min-h-[40px] bg-transparent border-none rounded-t-2xl p-5 text-base text-gray-800 placeholder-gray-400 focus:ring-0 resize-none font-sans leading-relaxed overflow-hidden"
              rows={1}
          />
          <div className="px-3 py-2 flex justify-between items-center border-t border-gray-50 bg-gray-50/30 rounded-b-2xl">
              <div className="flex items-center gap-2 px-2">
                 <span className="text-xs text-gray-400 font-medium">🤙</span>
              </div>
              <Button 
                onClick={handleOptimize} 
                isLoading={isLoading} 
                className="rounded-lg px-5 py-2 bg-gray-900 hover:bg-black text-white shadow-sm hover:shadow text-sm font-medium transition-all"
              >
                Mejorar Prompt
              </Button>
          </div>
        </div>
      </div>

      {/* Result Area - Artifact style */}
      {result && (
        <div className="animate-fadeIn duration-700">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ring-1 ring-gray-900/5">
                {/* Artifact Toolbar */}
                <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 flex items-center justify-between backdrop-blur-sm">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Prompt Optimizado
                    </span>
                    <button 
                        onClick={() => copyToClipboard(result.optimized)}
                        className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1.5 transition-colors bg-white border border-gray-200 rounded-md px-2 py-1 hover:border-gray-300"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 01-2-2V5" /></svg>
                        Copiar
                    </button>
                </div>
                
                {/* Content */}
                <div className="p-8 bg-white">
                    <div className="font-serif text-lg leading-relaxed text-gray-800 whitespace-pre-wrap selection:bg-blue-100 selection:text-blue-900">
                        {result.optimized}
                    </div>
                </div>

                {/* Footer Analysis */}
                <div className="bg-gray-50/50 px-6 py-5 border-t border-gray-100">
                    <div className="flex items-start gap-3">
                         <div className="mt-1 min-w-[20px] text-gray-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                         </div>
                         <div className="text-sm text-gray-600 leading-relaxed">
                            <span className="font-semibold text-gray-900 block mb-1">Análisis de la mejora</span>
                            {result.explanation}
                         </div>
                    </div>
                </div>
            </div>

            {/* Instructions Section */}
            <div className="mt-12 border-t border-gray-100 pt-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">Cómo usar este prompt</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 font-mono">1</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-900">Copia el resultado.</span> Usa el botón situado en la barra superior del resultado.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 font-mono">2</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-900">Rellena los datos.</span> Sustituye los textos entre <span className="font-mono bg-gray-100 px-1 rounded text-xs">[corchetes]</span> con tu información.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 font-mono">3</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-900">Envía a Gemini.</span> Pega el prompt final en el chat para obtener la mejor respuesta.
                  </p>
                </div>
              </div>
            </div>
        </div>
      )}

      {/* Empty State / Decorative - Minimal */}
      {!result && (
        <div className="flex justify-center mt-20 opacity-20 pointer-events-none grayscale">
           <img src={ImageLo} alt="" className="w-32 h-32 object-contain" />
        </div>
      )}
    </div>
  );
};