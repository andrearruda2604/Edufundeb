import React from 'react';
import { MOCK_FULL_TIME_DATA, FULL_TIME_BONUS_PER_STUDENT } from '../constants';
import { Clock, TrendingUp, PiggyBank, School, AlertCircle, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export const FullTimeManager: React.FC = () => {
  // Aggregated calculations
  const totalStudents = MOCK_FULL_TIME_DATA.reduce((acc, curr) => acc + curr.totalStudents, 0);
  const totalFullTime = MOCK_FULL_TIME_DATA.reduce((acc, curr) => acc + curr.fullTimeStudents, 0);
  const potentialExpansion = MOCK_FULL_TIME_DATA.reduce((acc, curr) => acc + curr.potentialSlots, 0);
  
  const percentageFullTime = (totalFullTime / totalStudents) * 100;
  const currentFunding = MOCK_FULL_TIME_DATA.reduce((acc, curr) => acc + curr.fundingReceived, 0);
  const potentialExtraFunding = potentialExpansion * FULL_TIME_BONUS_PER_STUDENT;

  const pieData = [
    { name: 'Tempo Integral', value: totalFullTime },
    { name: 'Parcial', value: totalStudents - totalFullTime },
  ];
  const COLORS = ['#4f46e5', '#e2e8f0'];

  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-slate-900">Gestor de Tempo Integral</h1>
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded border border-indigo-200">EC 135/2024</span>
        </div>
        <p className="text-slate-500">Monitore a expansão de matrículas e garanta o repasse do Programa Escola em Tempo Integral.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
              <Clock size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Cobertura Atual</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-slate-900">{percentageFullTime.toFixed(1)}%</span>
            <span className="text-xs text-slate-400 mb-1">dos alunos</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${percentageFullTime}%` }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-1">Meta Nacional: 50%</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
              <PiggyBank size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Fomento Recebido</span>
          </div>
          <span className="text-2xl font-bold text-slate-900">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: "compact" }).format(currentFunding)}
          </span>
          <p className="text-xs text-emerald-600 font-medium mt-1">Garantido em 2024</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-amber-400">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
              <TrendingUp size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Potencial Extra</span>
          </div>
          <span className="text-2xl font-bold text-slate-900">
            +{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: "compact" }).format(potentialExtraFunding)}
          </span>
          <p className="text-xs text-amber-600 font-medium mt-1">Se atingir 100% da capacidade</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
           <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <School size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Vagas Ociosas</span>
          </div>
          <span className="text-2xl font-bold text-slate-900">{potentialExpansion}</span>
          <p className="text-xs text-slate-400 mt-1">Vagas prontas para conversão</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Matrículas por Escola (Atual vs. Potencial)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_FULL_TIME_DATA} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  formatter={(value: number) => [value, 'Alunos']}
                />
                <Legend iconSize={8} wrapperStyle={{fontSize: '12px'}} />
                <Bar dataKey="fullTimeStudents" name="Matrículas Integrais" stackId="a" fill="#4f46e5" barSize={20} radius={[0,0,0,0]} />
                <Bar dataKey="potentialSlots" name="Expansão Possível" stackId="a" fill="#fbbf24" barSize={20} radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Donut */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Composição da Rede</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 text-xs mt-4">
             <div className="flex items-center gap-1">
               <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
               <span>Integral ({totalFullTime})</span>
             </div>
             <div className="flex items-center gap-1">
               <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
               <span>Parcial ({totalStudents - totalFullTime})</span>
             </div>
          </div>
        </div>
      </div>

      {/* Action Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Mapa de Expansão (Oportunidades)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Escola</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Vagas Integrais</th>
                <th className="px-6 py-4 font-semibold text-amber-600">Capacidade Ociosa</th>
                <th className="px-6 py-4 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_FULL_TIME_DATA.map((school) => (
                <tr key={school.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{school.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                      school.status === 'NEEDS_ACTION' ? 'bg-red-100 text-red-600' :
                      school.status === 'EXPANDING' ? 'bg-amber-100 text-amber-600' :
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {school.status === 'NEEDS_ACTION' ? 'Prioridade' : 
                       school.status === 'EXPANDING' ? 'Em Expansão' : 'Estável'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{school.fullTimeStudents} / {school.totalStudents}</td>
                  <td className="px-6 py-4 font-bold text-amber-600">+{school.potentialSlots}</td>
                  <td className="px-6 py-4 text-right">
                    {school.potentialSlots > 0 ? (
                       <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs flex items-center gap-1 ml-auto">
                         Simular Impacto <ArrowRight size={14} />
                       </button>
                    ) : (
                      <span className="text-slate-400 text-xs">Sem expansão</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
