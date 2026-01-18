import React, { useState, useMemo } from 'react';
import { SchoolStage, FinancialProjection } from '../types';
import { FUNDEB_BASE_VALUE_2024 } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Calculator, Coins, TrendingUp } from 'lucide-react';

export const FinancialProjectionCalc: React.FC = () => {
  // Initial state with some default counts
  const [inputs, setInputs] = useState<Record<SchoolStage, number>>({
    [SchoolStage.CRECHE]: 120,
    [SchoolStage.PRE_ESCOLA]: 340,
    [SchoolStage.FUNDAMENTAL_INICIAIS]: 1200,
    [SchoolStage.FUNDAMENTAL_FINAIS]: 980,
    [SchoolStage.EJA]: 150,
    [SchoolStage.ESPECIAL]: 45
  });

  const [useIqep, setUseIqep] = useState(true);

  // Weights (Standard Fundeb Factors - Simplified)
  const weights: Record<SchoolStage, number> = {
    [SchoolStage.CRECHE]: 1.30,
    [SchoolStage.PRE_ESCOLA]: 1.10,
    [SchoolStage.FUNDAMENTAL_INICIAIS]: 1.00,
    [SchoolStage.FUNDAMENTAL_FINAIS]: 1.10,
    [SchoolStage.EJA]: 0.80,
    [SchoolStage.ESPECIAL]: 1.20
  };

  // Mock IQEP Bonus (Paraná specific index simulation)
  const iqepBonus = 0.05; // 5% bonus if applicable

  const projections: FinancialProjection[] = useMemo(() => {
    return Object.values(SchoolStage).map(stage => {
      const count = inputs[stage];
      const baseWeight = weights[stage];
      const finalWeight = useIqep ? baseWeight + iqepBonus : baseWeight;
      const total = count * finalWeight * FUNDEB_BASE_VALUE_2024;
      
      return {
        stage,
        studentCount: count,
        weight: baseWeight,
        iqepBonus: useIqep ? iqepBonus : 0,
        baseValue: FUNDEB_BASE_VALUE_2024,
        total
      };
    });
  }, [inputs, useIqep]);

  const totalRevenue = projections.reduce((acc, curr) => acc + curr.total, 0);

  const handleInputChange = (stage: SchoolStage, value: string) => {
    const num = parseInt(value) || 0;
    setInputs(prev => ({ ...prev, [stage]: num }));
  };

  const chartColors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981'];

  return (
    <div className="space-y-6">
       <header>
        <h1 className="text-2xl font-bold text-slate-900">Calculadora de Repasse Projetado</h1>
        <p className="text-slate-500">Projeção baseada em alunos matriculados e fatores de ponderação.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Inputs */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Calculator className="text-indigo-600" size={20} />
              Parâmetros de Matrícula
            </h3>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Filtro Paraná (IQEP)</label>
              <button 
                onClick={() => setUseIqep(!useIqep)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${useIqep ? 'bg-indigo-600' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${useIqep ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(SchoolStage).map((stage) => (
              <div key={stage} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  {stage}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={inputs[stage]}
                    onChange={(e) => handleInputChange(stage, e.target.value)}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-lg font-medium rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <div className="text-xs text-slate-400 font-mono">
                    x{(weights[stage] + (useIqep ? iqepBonus : 0)).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary & Chart */}
        <div className="space-y-6">
          <div className="bg-indigo-600 p-6 rounded-xl text-white shadow-lg">
            <div className="flex items-center gap-2 mb-2 opacity-80">
              <Coins size={20} />
              <span className="text-sm font-medium">Projeção Anual Total</span>
            </div>
            <div className="text-3xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue)}
            </div>
             <div className="mt-4 flex items-center gap-2 text-indigo-200 text-sm">
              <TrendingUp size={16} />
              <span>Baseado em R$ 5.2k/aluno</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[300px]">
            <h3 className="text-sm font-bold text-slate-700 mb-4 text-center">Distribuição por Etapa</h3>
             <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projections}
                    dataKey="total"
                    nameKey="stage"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {projections.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)} />
                  <Legend iconSize={8} wrapperStyle={{fontSize: '10px'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
