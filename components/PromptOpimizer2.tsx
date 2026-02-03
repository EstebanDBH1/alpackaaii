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
    <div className="max-w-3xl mx-auto px-6 py-16 text-[#383838]">
      
      {/* Header text */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-['Source_Serif_4',serif] text-[#242424] tracking-tight mb-3 font-medium">
          Prompt Optimizer
        </h1>
        <p className="text-[#656565] text-sm font-['Inter',sans-serif]">
          Perfecciona tus instrucciones para Gemini 2.0
        </p>
      </div>

      {/* Input Area */}
      <div className="relative mb-12 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-stone-200 to-stone-100 rounded-2xl blur opacity-30 transition duration-1000"></div>
        <div className="relative bg-white rounded-2xl border border-[#E5E5E5] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all focus-within:shadow-[0_4px_12px_rgba(0,0,0,0.06)] focus-within:border-[#D4D4D4]">
          <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe lo que quieres lograr..."
              className="w-full min-h-[140px] bg-transparent border-none rounded-t-2xl p-5 text-base text-[#242424] placeholder-[#9ca3af] focus:ring-0 resize-none font-['Inter',sans-serif] leading-relaxed overflow-hidden"
              rows={1}
          />
          <div className="px-3 py-2 flex justify-between items-center border-t border-[#F0F0F0] bg-[#FAFAF9] rounded-b-2xl">
              <div className="flex items-center gap-2 px-2">
                 <div className="w-2 h-2 rounded-full bg-[#DA7756] opacity-80"></div>
                 <span className="text-xs text-[#6B6B6B] font-medium font-['Inter',sans-serif]">Gemini 2.0 Flash</span>
              </div>
              <Button 
                onClick={handleOptimize} 
                isLoading={isLoading} 
                className="rounded-lg px-5 py-2 bg-[#DA7756] hover:bg-[#C86646] text-white shadow-sm hover:shadow text-sm font-medium transition-all font-['Inter',sans-serif]"
              >
                Mejorar Prompt
              </Button>
          </div>
        </div>
      </div>

      {/* Result Area - Artifact style */}
      {result && (
        <div className="animate-fadeIn duration-700">
            <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
                {/* Artifact Toolbar */}
                <div className="bg-[#FAF9F6] px-4 py-3 border-b border-[#F0F0F0] flex items-center justify-between backdrop-blur-sm">
                    <span className="text-xs font-semibold text-[#656565] uppercase tracking-wider flex items-center gap-2 font-['Inter',sans-serif]">
                        <svg className="w-4 h-4 text-[#DA7756]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Prompt Optimizado
                    </span>
                    <button 
                        onClick={() => copyToClipboard(result.optimized)}
                        className="text-xs font-medium text-[#656565] hover:text-[#242424] flex items-center gap-1.5 transition-colors bg-white border border-[#E5E5E5] rounded-md px-2 py-1 hover:border-[#D4D4D4] font-['Inter',sans-serif]"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 01-2-2V5" /></svg>
                        Copiar
                    </button>
                </div>
                
                {/* Content */}
                <div className="p-8 bg-white">
                    <div className="font-['Source_Serif_4',serif] text-lg leading-relaxed text-[#242424] whitespace-pre-wrap selection:bg-[#fae2d9] selection:text-[#7c2d12]">
                        {result.optimized}
                    </div>
                </div>

                {/* Footer Analysis */}
                <div className="bg-[#FAF9F6] px-6 py-5 border-t border-[#F0F0F0]">
                    <div className="flex items-start gap-3">
                         <div className="mt-1 min-w-[20px] text-[#A8A8A8]">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                         </div>
                         <div className="text-sm text-[#525252] leading-relaxed font-['Inter',sans-serif]">
                            <span className="font-semibold text-[#242424] block mb-1">Análisis de la mejora</span>
                            {result.explanation}
                         </div>
                    </div>
                </div>
            </div>

            {/* Instructions Section */}
            <div className="mt-12 border-t border-[#E5E5E5] pt-8">
              <h3 className="text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider mb-6 font-['Inter',sans-serif]">Cómo usar este prompt</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-['Inter',sans-serif]">
                <div className="flex flex-col gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F0F0F0] flex items-center justify-center text-xs font-bold text-[#656565] font-mono">1</div>
                  <p className="text-sm text-[#656565] leading-relaxed">
                    <span className="font-semibold text-[#383838]">Copia el resultado.</span> Usa el botón situado en la barra superior del resultado.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F0F0F0] flex items-center justify-center text-xs font-bold text-[#656565] font-mono">2</div>
                  <p className="text-sm text-[#656565] leading-relaxed">
                    <span className="font-semibold text-[#383838]">Rellena los datos.</span> Sustituye los textos entre <span className="font-mono bg-[#F5F5F5] px-1 rounded text-xs text-[#DA7756]">[corchetes]</span> con tu información.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F0F0F0] flex items-center justify-center text-xs font-bold text-[#656565] font-mono">3</div>
                  <p className="text-sm text-[#656565] leading-relaxed">
                    <span className="font-semibold text-[#383838]">Envía a Gemini.</span> Pega el prompt final en el chat para obtener la mejor respuesta.
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