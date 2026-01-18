import React, { useState } from 'react';
import { MOCK_SCHOOLS_PERFORMANCE } from '../constants';
import { SchoolPerformance, QuizQuestion } from '../types';
import { generateSaebIntervention } from '../services/geminiService';
import { 
  Trophy, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  BrainCircuit, 
  Download, 
  ChevronRight,
  BookOpen,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export const SaebPredictor: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState<SchoolPerformance | null>(null);
  const [generating, setGenerating] = useState(false);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);

  // Stats calculation
  const totalSchools = MOCK_SCHOOLS_PERFORMANCE.length;
  const criticalSchools = MOCK_SCHOOLS_PERFORMANCE.filter(s => s.participationRate < 80).length;
  const avgMath = MOCK_SCHOOLS_PERFORMANCE.reduce((acc, s) => acc + s.avgScoreMath, 0) / totalSchools;
  const avgPort = MOCK_SCHOOLS_PERFORMANCE.reduce((acc, s) => acc + s.avgScorePort, 0) / totalSchools;

  const handleGenerateIntervention = async (school: SchoolPerformance) => {
    setSelectedSchool(school);
    setGenerating(true);
    setQuiz(null);
    
    // Simulate subject selection logic (usually based on lowest score, defaulting to Math here for demo)
    const subject = school.avgScoreMath < school.avgScorePort ? "Matemática" : "Português";
    
    try {
      const questions = await generateSaebIntervention("5º Ano", subject, school.weakSpot);
      setQuiz(questions);
    } catch (error) {
      console.error("Failed to generate quiz", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Preditor SAEB e Prova Paraná</h1>
        <p className="text-slate-500">Monitore a participação e desempenho para garantir os repasses do ICMS Educativo.</p>
      </header>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Participação Rede</p>
            <p className="text-xl font-bold text-slate-900">82.5%</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-lg text-red-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Escolas em Risco</p>
            <p className="text-xl font-bold text-slate-900">{criticalSchools} <span className="text-xs font-normal text-slate-500">(&lt;80%)</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Média Matemática</p>
            <p className="text-xl font-bold text-slate-900">{avgMath.toFixed(1)}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Média Português</p>
            <p className="text-xl font-bold text-slate-900">{avgPort.toFixed(1)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* School List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp size={20} className="text-slate-500" />
            Desempenho por Escola
          </h2>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="divide-y divide-slate-100">
               {MOCK_SCHOOLS_PERFORMANCE.map((school) => (
                 <div key={school.id} className="p-6 hover:bg-slate-50 transition-colors">
                   <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                     
                     <div className="flex-1">
                       <div className="flex items-center gap-2">
                         <h3 className="font-semibold text-slate-900">{school.name}</h3>
                         {school.participationRate < 80 && (
                           <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Risco de Corte</span>
                         )}
                       </div>
                       <p className="text-sm text-slate-500 mt-1">Ponto Fraco Identificado: <span className="font-medium text-amber-600">{school.weakSpot}</span></p>
                     </div>

                     <div className="flex items-center gap-6">
                       <div className="w-32">
                         <div className="flex justify-between text-xs mb-1">
                           <span className="text-slate-500">Participação</span>
                           <span className={`font-bold ${school.participationRate < 80 ? 'text-red-600' : 'text-emerald-600'}`}>{school.participationRate}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-100 rounded-full">
                           <div 
                             className={`h-full rounded-full ${school.participationRate < 80 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                             style={{ width: `${school.participationRate}%` }} 
                           />
                         </div>
                       </div>
                       
                       <div className="w-24 text-right">
                          <div className="text-xs text-slate-500">Nota Média</div>
                          <div className="font-bold text-slate-900 text-lg">
                            {((school.avgScoreMath + school.avgScorePort) / 2).toFixed(1)}
                          </div>
                       </div>

                       <button 
                         onClick={() => handleGenerateIntervention(school)}
                         className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-2 rounded-lg transition-colors group"
                         title="Gerar Intervenção com IA"
                       >
                         <BrainCircuit size={20} className="group-hover:scale-110 transition-transform" />
                       </button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* AI Intervention Panel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
          <div className="p-5 border-b border-slate-100 bg-slate-50 rounded-t-xl">
             <h2 className="font-bold text-slate-800 flex items-center gap-2">
               <BrainCircuit size={20} className="text-indigo-600" />
               Agente de Intervenção
             </h2>
          </div>

          <div className="flex-1 p-5 overflow-y-auto">
            {!selectedSchool ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                 <BookOpen size={48} className="mb-4 opacity-20" />
                 <p className="text-sm">Selecione uma escola ao lado para gerar um simulado de recuperação personalizado.</p>
              </div>
            ) : generating ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                 <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                 <div>
                   <h3 className="font-medium text-slate-900">Analisando Matriz SAEB...</h3>
                   <p className="text-sm text-slate-500">Gerando questões para {selectedSchool.weakSpot}</p>
                 </div>
              </div>
            ) : quiz ? (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                  <h3 className="font-bold text-indigo-900 text-sm mb-1">Plano de Intervenção Gerado</h3>
                  <p className="text-xs text-indigo-700">
                    Escola: {selectedSchool.name}<br/>
                    Foco: <span className="font-semibold">{selectedSchool.weakSpot}</span>
                  </p>
                </div>

                <div className="space-y-6">
                  {quiz.map((q, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded min-w-fit mt-1">
                          {q.descriptor}
                        </span>
                        <p className="text-sm font-medium text-slate-900">{idx + 1}. {q.question}</p>
                      </div>
                      <div className="pl-2 space-y-1">
                        {q.options.map((opt, optIdx) => (
                           <div key={optIdx} className={`text-xs px-3 py-2 rounded border ${optIdx === q.correctAnswer ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-slate-100 text-slate-600'}`}>
                             {String.fromCharCode(65 + optIdx)}) {opt}
                           </div>
                        ))}
                      </div>
                      <div className="bg-amber-50 p-2 rounded text-[10px] text-amber-800 border border-amber-100">
                        <strong>Dica Pedagógica:</strong> {q.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-red-500">Erro ao gerar simulado. Tente novamente.</div>
            )}
          </div>

          {quiz && (
             <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl">
               <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                 <Download size={18} />
                 Baixar Simulado (PDF)
               </button>
             </div>
          )}
        </div>

      </div>
    </div>
  );
};
