import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { MOCK_EXPENSES, TOTAL_FUNDEB_REVENUE_YTD } from '../constants';
import { ExpenseCategory } from '../types';
import { AlertTriangle, CheckCircle2, TrendingUp, DollarSign, Wallet, ArrowRight } from 'lucide-react';

export const ExpenseOptimizer: React.FC = () => {
  // Calculations
  const totalPayroll = MOCK_EXPENSES
    .filter(e => e.category === ExpenseCategory.PAYROLL_70)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalMaintenance = MOCK_EXPENSES
    .filter(e => e.category === ExpenseCategory.MAINTENANCE_30)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalSpent = totalPayroll + totalMaintenance;
  const balance = TOTAL_FUNDEB_REVENUE_YTD - totalSpent;

  // Percentages relative to REVENUE (not just spent)
  const payrollPercent = (totalPayroll / TOTAL_FUNDEB_REVENUE_YTD) * 100;
  const maintenancePercent = (totalMaintenance / TOTAL_FUNDEB_REVENUE_YTD) * 100;
  const balancePercent = (balance / TOTAL_FUNDEB_REVENUE_YTD) * 100;

  // Compliance Logic
  const minPayrollRequired = TOTAL_FUNDEB_REVENUE_YTD * 0.70;
  const payrollGap = minPayrollRequired - totalPayroll;
  const isCompliant = payrollPercent >= 70;
  const isCritical = payrollPercent < 65; // Warning threshold

  const chartData = [
    { name: 'Folha (70%)', value: totalPayroll },
    { name: 'Manutenção (30%)', value: totalMaintenance },
    { name: 'Saldo em Caixa', value: balance },
  ];

  const COLORS = ['#4f46e5', '#f59e0b', '#e2e8f0'];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-slate-900">Otimizador de Gasto 70/30</h1>
          <span className={`text-xs font-bold px-2 py-1 rounded border ${isCompliant ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
            {isCompliant ? 'EM CONFORMIDADE' : 'RISCO DE GLOSA'}
          </span>
        </div>
        <p className="text-slate-500">Monitoramento da trava financeira do Art. 26 da Lei do Fundeb (Mínimo 70% em folha).</p>
      </header>

      {/* Main Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Payroll Gauge */}
        <div className={`p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden ${isCompliant ? 'bg-white' : 'bg-red-50 border-red-100'}`}>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
               <div className={`p-2 rounded-lg ${isCompliant ? 'bg-indigo-100 text-indigo-600' : 'bg-red-100 text-red-600'}`}>
                  <Wallet size={20} />
               </div>
               <span className="text-sm font-bold text-slate-700 uppercase">Índice de Pessoal (70%)</span>
            </div>
            <div className="flex items-end gap-2 mt-4">
              <span className={`text-4xl font-bold ${isCompliant ? 'text-slate-900' : 'text-red-600'}`}>
                {payrollPercent.toFixed(1)}%
              </span>
              <span className="text-sm text-slate-500 mb-1.5">acumulado</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
               <div 
                 className={`h-2 rounded-full transition-all duration-1000 ${isCompliant ? 'bg-indigo-600' : 'bg-red-500'}`} 
                 style={{ width: `${Math.min(payrollPercent, 100)}%` }}
               />
            </div>
            <p className="text-xs text-slate-500 mt-2">Meta mínima: 70.0%</p>
          </div>
          {!isCompliant && (
            <div className="absolute -right-4 -top-4 opacity-10 text-red-600">
               <AlertTriangle size={120} />
            </div>
          )}
        </div>

        {/* Maintenance Gauge */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
             <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                <TrendingUp size={20} />
             </div>
             <span className="text-sm font-bold text-slate-700 uppercase">Manutenção (Máx 30%)</span>
          </div>
          <div className="flex items-end gap-2 mt-4">
            <span className="text-4xl font-bold text-slate-900">
              {maintenancePercent.toFixed(1)}%
            </span>
            <span className="text-sm text-slate-500 mb-1.5">acumulado</span>
          </div>
           <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
               <div 
                 className={`h-2 rounded-full transition-all duration-1000 ${maintenancePercent > 30 ? 'bg-red-500' : 'bg-amber-500'}`} 
                 style={{ width: `${Math.min(maintenancePercent * 3.33, 100)}%` }} // Scale to visualize limit better
               />
            </div>
            <p className="text-xs text-slate-500 mt-2">Limite máximo: 30.0%</p>
        </div>

        {/* Balance */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
                  <DollarSign size={20} />
               </div>
               <span className="text-sm font-bold text-slate-700 uppercase">Saldo em Conta</span>
            </div>
            <span className="text-3xl font-bold text-slate-900 block mt-4">
              {formatCurrency(balance)}
            </span>
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Disponível para aplicação imediata.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Alerts & Actions */}
        <div className="lg:col-span-2 space-y-6">
           
           {!isCompliant && (
             <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 animate-fade-in">
               <div className="bg-red-100 p-4 rounded-full text-red-600 shrink-0">
                 <AlertTriangle size={32} />
               </div>
               <div className="flex-1">
                 <h3 className="text-lg font-bold text-red-900">Déficit de Aplicação em Folha Detectado</h3>
                 <p className="text-red-700 mt-1">
                   Você ainda precisa aplicar <span className="font-bold">{formatCurrency(payrollGap)}</span> em remuneração de profissionais da educação para atingir os 70% obrigatórios.
                 </p>
                 <div className="mt-4 flex gap-3">
                   <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                     Simular Rateio/Abono
                   </button>
                   <button className="bg-white hover:bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                     Verificar Classificação de Despesas
                   </button>
                 </div>
               </div>
             </div>
           )}

           {isCompliant && (
             <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex items-center gap-4">
                <CheckCircle2 size={32} className="text-emerald-600" />
                <div>
                  <h3 className="text-lg font-bold text-emerald-900">Situação Regular</h3>
                  <p className="text-emerald-700 text-sm">Os gastos com pessoal estão dentro da meta estabelecida pelo Fundeb.</p>
                </div>
             </div>
           )}

           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h3 className="font-bold text-slate-700">Últimos Lançamentos</h3>
               <button className="text-indigo-600 text-xs font-medium hover:underline">Ver Razão Completo</button>
             </div>
             <table className="w-full text-sm text-left">
               <thead className="text-slate-500 bg-white border-b border-slate-100">
                 <tr>
                   <th className="px-4 py-3 font-medium">Data</th>
                   <th className="px-4 py-3 font-medium">Descrição</th>
                   <th className="px-4 py-3 font-medium">Categoria</th>
                   <th className="px-4 py-3 font-medium text-right">Valor</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {MOCK_EXPENSES.slice(0, 5).map((expense) => (
                   <tr key={expense.id} className="hover:bg-slate-50">
                     <td className="px-4 py-3 text-slate-600 font-mono text-xs">{new Date(expense.date).toLocaleDateString('pt-BR')}</td>
                     <td className="px-4 py-3 text-slate-900">{expense.description}</td>
                     <td className="px-4 py-3">
                       <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                         expense.category === ExpenseCategory.PAYROLL_70 
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-100' 
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                       }`}>
                         {expense.category === ExpenseCategory.PAYROLL_70 ? 'Folha 70%' : 'M&D 30%'}
                       </span>
                     </td>
                     <td className="px-4 py-3 text-right font-medium text-slate-700">
                       {formatCurrency(expense.amount)}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-4 text-center">Distribuição dos Recursos</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{fontSize: '11px'}} />
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 mt-4 text-xs text-slate-500 leading-relaxed border border-slate-100">
            <p>
              <strong>Nota Técnica:</strong> O saldo não aplicado até 31/12 pode ser reprogramado para o primeiro quadrimestre do ano seguinte, limitado a 10% do total.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};