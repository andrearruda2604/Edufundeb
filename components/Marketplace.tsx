import React from 'react';
import { Database, Search, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface ERP {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'connected' | 'available' | 'maintenance';
  color: string;
}

const erpList: ERP[] = [
  {
    id: 'totvs',
    name: 'TOTVS Educacional',
    description: 'Integração completa com o módulo acadêmico e financeiro da suíte RM/Protheus.',
    category: 'Gestão Acadêmica',
    status: 'available',
    color: 'bg-blue-600'
  },
  {
    id: 'sap',
    name: 'SAP S/4HANA',
    description: 'Conector nativo para módulos de FI/CO e gestão de ativos educacionais.',
    category: 'ERP Corporativo',
    status: 'available',
    color: 'bg-slate-800'
  },
  {
    id: 'oracle',
    name: 'Oracle NetSuite',
    description: 'Automação de processos financeiros e contábeis em nuvem.',
    category: 'ERP Nuvem',
    status: 'available',
    color: 'bg-red-600'
  },
  {
    id: 'sankhya',
    name: 'Sankhya ERP',
    description: 'Gestão integrada com foco em inteligência de dados para instituições de ensino.',
    category: 'Gestão Integrada',
    status: 'maintenance',
    color: 'bg-green-600'
  },
  {
    id: 'microsoft',
    name: 'Microsoft Dynamics 365',
    description: 'Unifica dados de CRM e ERP para uma visão 360º do aluno.',
    category: 'CRM & ERP',
    status: 'available',
    color: 'bg-indigo-600'
  },
  {
    id: 'iex',
    name: 'iEducare',
    description: 'Sistema de gestão escolar open source amplamente utilizado em redes municipais.',
    category: 'Gestão Pública',
    status: 'connected',
    color: 'bg-orange-500'
  }
];

export const Marketplace: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Marketplace de Integrações</h2>
          <p className="text-slate-500 text-sm mt-1">
            Conecte o EduFinance 360 aos seus sistemas de gestão (ERPs) favoritos.
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar integração..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {erpList.map((erp) => (
          <div key={erp.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${erp.color} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                {erp.name.charAt(0)}
              </div>
              {erp.status === 'connected' && (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <CheckCircle2 size={12} />
                  Conectado
                </span>
              )}
              {erp.status === 'maintenance' && (
                <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  <AlertCircle size={12} />
                  Em Breve
                </span>
              )}
            </div>
            
            <div className="mb-4 flex-1">
              <h3 className="font-semibold text-slate-800 mb-1">{erp.name}</h3>
              <p className="text-xs text-indigo-600 font-medium mb-2">{erp.category}</p>
              <p className="text-sm text-slate-500 line-clamp-3">
                {erp.description}
              </p>
            </div>

            <button 
              className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2
                ${erp.status === 'connected' 
                  ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }
              `}
            >
              {erp.status === 'connected' ? 'Configurar' : 'Conectar'}
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="bg-indigo-900 rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Não encontrou seu ERP?</h3>
          <p className="text-indigo-200 text-sm max-w-lg">
            Nossa equipe de engenharia pode desenvolver conectores personalizados para sua instituição.
            Entre em contato para solicitar uma integração sob demanda.
          </p>
        </div>
        <button className="whitespace-nowrap bg-white text-indigo-900 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
          Solicitar Integração
        </button>
      </div>
    </div>
  );
};
