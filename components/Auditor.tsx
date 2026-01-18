import React, { useState } from 'react';
import { auditStudentDataWithGemini } from '../services/geminiService';
import { MOCK_STUDENTS } from '../constants';
import { AuditIssue, Severity } from '../types';
import { Search, Upload, AlertCircle, CheckCircle2, RefreshCw, ChevronDown, ChevronUp, User } from 'lucide-react';

export const Auditor: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [issues, setIssues] = useState<AuditIssue[]>([]);
  const [audited, setAudited] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleAudit = async () => {
    setAnalyzing(true);
    setExpandedIndex(null);
    try {
      const result = await auditStudentDataWithGemini(MOCK_STUDENTS);
      setIssues(result);
      setAudited(true);
    } catch (error) {
      console.error("Audit failed", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const toggleRow = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getSeverityColor = (severity: Severity) => {
    switch (severity) {
      case Severity.CRITICAL: return 'bg-red-100 text-red-700 border-red-200';
      case Severity.HIGH: return 'bg-orange-100 text-orange-700 border-orange-200';
      case Severity.MEDIUM: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case Severity.LOW: return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStudentData = (id: string) => MOCK_STUDENTS.find(s => s.id === id);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Auditor de Inconsistências (Data Cleaning)</h1>
          <p className="text-slate-500">Utilize a IA para varrer a base de alunos e encontrar erros que barram o Fundeb.</p>
        </div>
        {!analyzing && (
           <button 
             onClick={handleAudit}
             className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-md active:scale-95"
           >
             <Search size={18} />
             {audited ? 'Re-auditar Base' : 'Iniciar Auditoria IA'}
           </button>
        )}
      </header>

      {/* Input Section */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-300">
        <div className="bg-slate-50 p-4 rounded-full mb-4">
          <Upload size={32} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900">Carregar Dados do ERP</h3>
        <p className="text-slate-500 mb-6 max-w-md">
          Carregue o arquivo CSV ou Excel exportado do seu sistema acadêmico.
          <br/> <span className="text-xs text-indigo-600 font-medium">(Simulação: Utilizando MOCK_DATA com erros propositais)</span>
        </p>
        
        {analyzing && (
          <div className="flex items-center gap-3 text-indigo-600 bg-indigo-50 px-6 py-3 rounded-full animate-pulse">
            <RefreshCw className="animate-spin" size={20} />
            <span className="font-semibold">Gemini analisando padrões e CPFs...</span>
          </div>
        )}
      </div>

      {/* Results Section */}
      {audited && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <AlertCircle className="text-amber-500" />
            Problemas Encontrados ({issues.length})
          </h2>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Aluno / ID</th>
                    <th className="px-6 py-4 font-semibold">Campo Afetado</th>
                    <th className="px-6 py-4 font-semibold">Descrição do Erro</th>
                    <th className="px-6 py-4 font-semibold">Severidade</th>
                    <th className="px-6 py-4 font-semibold">Ação Sugerida</th>
                    <th className="px-6 py-4 font-semibold w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {issues.map((issue, idx) => {
                    const isExpanded = expandedIndex === idx;
                    const student = getStudentData(issue.recordId);
                    
                    return (
                      <React.Fragment key={idx}>
                        <tr 
                          onClick={() => toggleRow(idx)} 
                          className={`hover:bg-slate-50 transition-colors cursor-pointer ${isExpanded ? 'bg-slate-50' : ''}`}
                        >
                          <td className="px-6 py-4 font-medium text-slate-900">
                            {issue.studentName}
                            <div className="text-xs text-slate-400 font-mono mt-0.5">{issue.recordId}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-600 font-mono text-xs uppercase bg-slate-100 rounded px-2 py-1 w-fit">
                              {issue.field}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600 max-w-xs truncate" title={issue.description}>
                            {issue.description}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(issue.severity)}`}>
                              {issue.severity}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-700 flex items-center gap-2">
                             <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                             <span className="truncate max-w-xs" title={issue.suggestedAction}>{issue.suggestedAction}</span>
                          </td>
                          <td className="px-6 py-4 text-slate-400">
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </td>
                        </tr>
                        
                        {isExpanded && (
                          <tr className="bg-slate-50/50">
                            <td colSpan={6} className="px-6 pb-6 pt-0 border-b border-slate-100">
                              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 mt-2 flex flex-col md:flex-row gap-6 animate-fade-in-down">
                                
                                {/* Error Details */}
                                <div className="flex-1 space-y-4">
                                  <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-red-100 text-red-600 p-2 rounded-lg">
                                      <AlertCircle size={20} />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-slate-900">Detalhamento do Problema</h4>
                                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                                        {issue.description}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                                      <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-slate-900">Correção Recomendada</h4>
                                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                                        {issue.suggestedAction}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Student Context Data */}
                                <div className="flex-1 bg-slate-50 rounded-lg p-4 border border-slate-200">
                                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
                                    <User size={16} className="text-indigo-600" />
                                    <h4 className="font-semibold text-slate-800 text-sm">Dados no ERP (Contexto)</h4>
                                  </div>
                                  
                                  {student ? (
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div>
                                        <span className="text-xs text-slate-500 block">CPF</span>
                                        <span className={`font-mono ${issue.field.toLowerCase().includes('cpf') ? 'text-red-600 font-bold bg-red-50 px-1 rounded' : 'text-slate-700'}`}>
                                          {student.cpf}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-xs text-slate-500 block">Nascimento</span>
                                        <span className={`font-mono ${issue.field.toLowerCase().includes('birth') || issue.field.toLowerCase().includes('nascimento') ? 'text-red-600 font-bold bg-red-50 px-1 rounded' : 'text-slate-700'}`}>
                                          {student.birthDate}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-xs text-slate-500 block">Série/Ano</span>
                                        <span className={`font-medium ${issue.field.toLowerCase().includes('grade') || issue.field.toLowerCase().includes('serie') ? 'text-red-600 font-bold bg-red-50 px-1 rounded' : 'text-slate-700'}`}>
                                          {student.grade}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-xs text-slate-500 block">Transporte</span>
                                        <span className={`font-medium ${issue.field.toLowerCase().includes('transport') ? 'text-red-600 font-bold bg-red-50 px-1 rounded' : 'text-slate-700'}`}>
                                          {student.transportationType}
                                        </span>
                                      </div>
                                       <div className="col-span-2">
                                        <span className="text-xs text-slate-500 block">Deficiência / Laudo</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`px-2 py-0.5 rounded text-xs ${student.hasDisability ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                                                Deficiência: {student.hasDisability ? 'Sim' : 'Não'}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded text-xs ${student.disabilityDocAttached ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                Laudo: {student.disabilityDocAttached ? 'Anexado' : 'Ausente'}
                                            </span>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-slate-400 text-sm italic">Dados do aluno não encontrados.</div>
                                  )}
                                </div>
                                
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                  {issues.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        Nenhuma inconsistência encontrada. Sua base está limpa!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};