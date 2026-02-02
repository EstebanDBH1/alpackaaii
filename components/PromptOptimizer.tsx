import React, { useState } from 'react';
import { optimizePromptWithGemini } from '../services/gemini';
import { Tone, Complexity, PromptRequest, OptimizationResult } from '../types';
import { Button } from './Button';
import ImageLo from "../assets/alpackatwo.png";

export const PromptOptimizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState<Tone>(Tone.PROFESSIONAL);
  const [complexity, setComplexity] = useState<Complexity>(Complexity.BALANCED);
  const [targetModel, setTargetModel] = useState('Gemini 2.0 Flash');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);

  const handleOptimize = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      const request: PromptRequest = {
        originalPrompt: prompt,
        tone,
        complexity,
        targetModel
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Input Controls (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xl shadow-gray-200/50 sticky top-24">
            <h2 className="text-lg text-gray-900 mb-6 flex items-center gap-3">
              <span className="bg-blue-50 text-blue-600 p-2 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </span>
              Configuración
            </h2>
            
            <div className="flex flex-col gap-5 mb-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Tono</label>
                <div className="relative">
                  <select 
                    value={tone}
                    onChange={(e) => setTone(e.target.value as Tone)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer hover:bg-gray-100"
                  >
                    {Object.values(Tone).map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-2">Detalle</label>
                <div className="relative">
                  <select 
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value as Complexity)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer hover:bg-gray-100"
                  >
                    {Object.values(Complexity).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div>
                 <label className="block text-sm text-gray-600 mb-2">Modelo</label>
                 <input 
                    type="text" 
                    value={targetModel}
                    onChange={(e) => setTargetModel(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                    placeholder="e.g. Gemini 2.0"
                 />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Tu Idea</label>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe tu idea..."
                    className="w-full h-32 bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all placeholder-gray-400"
                />
              </div>
            </div>

            <Button 
              onClick={handleOptimize} 
              isLoading={isLoading} 
              className="w-full py-3 shadow-lg shadow-blue-500/20"
            >
              Generar Prompt
            </Button>
          </div>
        </div>

        {/* Right Column: Result (8 cols) */}
        <div className="lg:col-span-8">
            {result ? (
              <div className="animate-fadeIn space-y-8">
                
                {/* Header Section */}
                <div>
                    <div className="text-blue-600 text-xs tracking-widest uppercase mb-2 font-medium">Resultado Generado</div>
                    <h1 className="text-3xl md:text-4xl text-gray-900 leading-tight">
                        Optimización de Prompt para {targetModel}
                    </h1>
                </div>

                {/* Info Box */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-sm text-gray-600 leading-relaxed">
                    Este prompt utiliza técnicas avanzadas de <strong>Chain-of-Thought</strong> y <strong>Asignación de Roles</strong>. 
                    Para obtener los mejores resultados, copia el bloque completo y pégalo en tu modelo de IA preferido.
                </div>

                {/* Prompt Card */}
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
                    <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">PROMPT</span>
                        <button 
                            onClick={() => copyToClipboard(result.optimized)}
                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copiar Texto
                        </button>
                    </div>
                    <div className="p-8 bg-white">
                        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
                            {result.optimized}
                        </pre>
                    </div>
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                    <div>
                        <h3 className="text-xs uppercase tracking-wider text-gray-900 mb-4 font-bold">Estrategia Aplicada</h3>
                        <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                             <p>{result.explanation}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs uppercase tracking-wider text-gray-900 mb-4 font-bold">Cómo usar este prompt</h3>
                        <ul className="text-sm text-gray-600 leading-relaxed space-y-2 list-disc list-inside marker:text-gray-300">
                            <li>Rellena los datos entre [corchetes] antes de enviar.</li>
                            <li>Si la respuesta es muy larga, pide un resumen.</li>
                            <li>Define claramente el rol para mejores resultados.</li>
                        </ul>
                    </div>
                </div>

              </div>
            ) : (
               /* Empty State */
              <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
                 <div className="w-64 h-64 mb-6 opacity-80">
                    <img 
                        src={ImageLo} 
                        alt="Writing" 
                        className="w-full h-full object-contain grayscale opacity-50 mix-blend-multiply" 
                    />
                 </div>
                 <h3 className="text-xl text-gray-900 mb-2">Listo para crear</h3>
                 <p className="text-gray-500 max-w-md">
                    Configura los parámetros a la izquierda y tu prompt profesional aparecerá aquí con el formato perfecto.
                 </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};