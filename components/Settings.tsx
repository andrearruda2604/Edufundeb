import React, { useState } from 'react';
import { Marketplace } from './Marketplace';
import { LayoutGrid, User, Bell, Lock } from 'lucide-react';

export const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('marketplace');

    const tabs = [
        { id: 'marketplace', label: 'Integrações', icon: LayoutGrid },
        { id: 'profile', label: 'Perfil', icon: User },
        { id: 'notifications', label: 'Notificações', icon: Bell },
        { id: 'security', label: 'Segurança', icon: Lock },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Configurações</h1>
                <p className="text-slate-500">Gerencie suas preferências e integrações do sistema.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[600px] flex flex-col md:flex-row overflow-hidden">
                {/* Sidebar de Configurações */}
                <div className="w-full md:w-64 border-r border-slate-200 bg-slate-50 p-4">
                    <nav className="space-y-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${activeTab === tab.id
                                            ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Conteúdo Principal */}
                <div className="flex-1 p-8 overflow-y-auto">
                    {activeTab === 'marketplace' && <Marketplace />}

                    {activeTab !== 'marketplace' && (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                {(() => {
                                    const activeTabObj = tabs.find(t => t.id === activeTab);
                                    const Icon = activeTabObj?.icon || LayoutGrid;
                                    return <Icon size={32} />;
                                })()}
                            </div>
                            <h3 className="text-lg font-medium text-slate-600">Em Desenvolvimento</h3>
                            <p className="text-sm">A seção de {tabs.find(t => t.id === activeTab)?.label} estará disponível em breve.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
