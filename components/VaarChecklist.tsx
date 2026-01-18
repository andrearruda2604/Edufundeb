import React, { useState } from 'react';
import { INITIAL_VAAR_CONDITIONS } from '../constants';
import { CheckCircle, AlertTriangle, XCircle, ExternalLink, ChevronDown, ChevronUp, FileText, Calendar, Gavel } from 'lucide-react';

export const VaarChecklist: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
       <header>
        <h1 className="text-2xl font-bold text-slate-900">Condicionalidades VAAR</h1>
        <p className="text-slate-500">Checklist visual das 5 condicionalidades do Novo Fundeb para habilitação.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {INITIAL_VAAR_CONDITIONS.map((condition) => {
          const isExpanded = expandedId === condition.id;
          
          return (
            <div 
              key={condition.id} 
              className={`bg-white rounded-xl border transition-all duration-300 ${
                isExpanded ? 'border-indigo-200 shadow-md ring-1 ring-indigo-50' : 'border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Card Header (Clickable for expand) */}
              <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                <div className="flex items-start gap-4 flex-1">
                  <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                    ${condition.status === 'GREEN' ? 'bg-emerald-100 text-emerald-600' : 
                      condition.status === 'YELLOW' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}>
                    {condition.status === 'GREEN' && <CheckCircle size={24} />}
                    {condition.status === 'YELLOW' && <AlertTriangle size={24} />}
                    {condition.status === 'RED' && <XCircle size={24} />}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">{condition.id}. {condition.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">{condition.description}</p>
                    
                    {/* Metric Bar */}
                    <div className="mt-3 max-w-xs w-full">
                      <div className="flex justify-between text-xs mb-1 font-medium text-slate-700">
                        <span>Progresso Atual: {condition.metric}%</span>
                        <span>Meta: {condition.target}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            condition.metric >= condition.target ? 'bg-emerald-500' :
                            condition.metric >= condition.target * 0.7 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${condition.metric}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 min-w-[140px]">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border
                     ${condition.status === 'GREEN' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                       condition.status === 'YELLOW' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                     {condition.status === 'GREEN' ? 'Habilitado' : condition.status === 'YELLOW' ? 'Em Risco' : 'Não Habilitado'}
                   </span>
                   <button 
                    onClick={() => toggleExpand(condition.id)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1 transition-colors outline-none focus:ring-2 focus:ring-indigo-100 rounded px-2 py-1"
                   >
                     {isExpanded ? 'Ocultar Detalhes' : 'Ver Detalhes'} 
                     {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                   </button>
                </div>

              </div>

              {/* Expanded Details Section */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-0 border-t border-slate-100 bg-slate-50/50 rounded-b-xl animate-fade-in">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
                    
                    {/* Left Column: Context & Legal */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Gavel size={16} className="text-slate-500" />
                          Critérios e Base Legal
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">
                          {condition.details}
                        </p>
                        <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-slate-200 text-xs font-mono text-slate-600">
                          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                          {condition.legalRef}
                        </div>
                      </div>

                      <div>
                         <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Calendar size={16} className="text-slate-500" />
                          Prazo Limite para Regularização
                        </h4>
                        <span className={`text-sm font-medium px-3 py-1 rounded ${condition.status === 'RED' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                          {condition.deadline}
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Required Documents */}
                    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileText size={16} className="text-slate-500" />
                        Evidências Necessárias (Simec)
                      </h4>
                      <ul className="space-y-3">
                        {condition.requiredDocs?.map((doc, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                            <div className="mt-0.5 min-w-[16px] flex justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div>
                            </div>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
                        <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                          Acessar Simec <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};