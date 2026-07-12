import React from 'react';
import { Settings, Bell, Lock, Database } from 'lucide-react';

export const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-dark">Configurações</h1>
        <p className="text-gray-500 mt-1">Gerenciamento do sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="text-blue-600" size={24} />
            <h2 className="text-lg font-bold text-text-dark">Configurações Gerais</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Nome da Organização</label>
              <input type="text" defaultValue="PM Blumenau" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Email de Contato</label>
              <input type="email" defaultValue="contato@pm-blumenau.sc.gov.br" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Telefone</label>
              <input type="tel" defaultValue="(47) 3000-0000" className="input-field" />
            </div>
            <button className="btn-primary w-full">Salvar Alterações</button>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-orange-600" size={24} />
            <h2 className="text-lg font-bold text-text-dark">Notificações</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-dark">Alertas de Manutenção</label>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-dark">Notificações por Email</label>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-dark">Alertas de Vencimento</label>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <button className="btn-primary w-full">Salvar Preferências</button>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-red-600" size={24} />
            <h2 className="text-lg font-bold text-text-dark">Segurança</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Alterar Senha</label>
              <input type="password" placeholder="Senha atual" className="input-field mb-2" />
              <input type="password" placeholder="Nova senha" className="input-field mb-2" />
              <input type="password" placeholder="Confirmar senha" className="input-field" />
            </div>
            <button className="btn-primary w-full">Atualizar Senha</button>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-green-600" size={24} />
            <h2 className="text-lg font-bold text-text-dark">Banco de Dados</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Gerenciar dados do sistema</p>
            <button className="btn-secondary w-full">Fazer Backup</button>
            <button className="btn-secondary w-full">Restaurar Backup</button>
            <button className="btn-secondary w-full text-red-600 hover:bg-red-50">Limpar Cache</button>
          </div>
        </div>
      </div>
    </div>
  );
};