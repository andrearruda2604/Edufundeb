import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Auditor } from './components/Auditor';
import { VaarChecklist } from './components/VaarChecklist';
import { FinancialProjectionCalc } from './components/FinancialProjection';
import { SaebPredictor } from './components/SaebPredictor';
import { FullTimeManager } from './components/FullTimeManager';
import { ExpenseOptimizer } from './components/ExpenseOptimizer';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/auditor" element={<Auditor />} />
              <Route path="/otimizador" element={<ExpenseOptimizer />} />
              <Route path="/baar" element={<VaarChecklist />} />
              <Route path="/projecao" element={<FinancialProjectionCalc />} />
              <Route path="/saeb" element={<SaebPredictor />} />
              <Route path="/integral" element={<FullTimeManager />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;