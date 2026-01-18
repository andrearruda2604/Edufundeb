import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShieldAlert, Calculator, BookOpenCheck, Settings, GraduationCap, Clock, Scale } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md'
        : 'text-slate-600 hover:bg-slate-100'
    }`;

  return (
    <aside className="w-64 bg-white h-screen border-r border-slate-200 flex flex-col fixed left-0 top-0 z-10">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <span className="text-xl font-bold text-slate-800">EduFinance 360</span>
        </div>
        <p className="text-xs text-slate-500 mt-1 pl-10">Intelligence Layer</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/" className={navClass}>
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </NavLink>
        <NavLink to="/auditor" className={navClass}>
          <ShieldAlert size={20} />
          <span className="font-medium">Auditor IA</span>
        </NavLink>
        <NavLink to="/otimizador" className={navClass}>
          <Scale size={20} />
          <span className="font-medium">Otimizador 70/30</span>
        </NavLink>
        <NavLink to="/baar" className={navClass}>
          <BookOpenCheck size={20} />
          <span className="font-medium">Condicionalidades</span>
        </NavLink>
        <NavLink to="/projecao" className={navClass}>
          <Calculator size={20} />
          <span className="font-medium">Projeção Fundeb</span>
        </NavLink>
        <NavLink to="/saeb" className={navClass}>
          <GraduationCap size={20} />
          <span className="font-medium">Preditor SAEB</span>
        </NavLink>
        <NavLink to="/integral" className={navClass}>
          <Clock size={20} />
          <span className="font-medium">Tempo Integral</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 transition-colors w-full">
          <Settings size={20} />
          <span className="font-medium">Configurações</span>
        </button>
      </div>
    </aside>
  );
};