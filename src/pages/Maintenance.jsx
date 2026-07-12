import React, { useEffect, useState } from 'react';
import { maintenanceService } from '../../services/api';
import { Plus, Calendar, AlertCircle } from 'lucide-react';

export const Maintenance = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaintenances();
  }, []);

  const fetchMaintenances = async () => {
    try {
      const res = await maintenanceService.getAll();
      setMaintenances(res.data);
    } catch (error) {
      console.error('Erro ao carregar manutenções:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-orange-100 text-orange-800',
      completed: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status) => {
    const statuses = {
      scheduled: '🟢 Agendada',
      in_progress: '🟡 Em andamento',
      completed: '✅ Concluída',
      overdue: '🔴 Vencida',
    };
    return statuses[status] || status;
  };

  if (loading) return <div className="text-center py-12">Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-dark">Manutenção Preventiva</h1>
          <p className="text-gray-500 mt-1">Plano de manutenção das viaturas</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nova Manutenção
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={20} className="text-blue-600" />
            <h3 className="text-gray-500 text-sm font-medium">Agendadas</h3>
          </div>
          <p className="text-3xl font-bold text-text-dark">
            {maintenances.filter(m => m.status === 'scheduled').length}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={20} className="text-orange-600" />
            <h3 className="text-gray-500 text-sm font-medium">Em Andamento</h3>
          </div>
          <p className="text-3xl font-bold text-text-dark">
            {maintenances.filter(m => m.status === 'in_progress').length}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={20} className="text-red-600" />
            <h3 className="text-gray-500 text-sm font-medium">Vencidas</h3>
          </div>
          <p className="text-3xl font-bold text-text-dark">
            {maintenances.filter(m => m.status === 'overdue').length}
          </p>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Viatura</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Tipo</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Descrição</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Data Agendada</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Prioridade</th>
            </tr>
          </thead>
          <tbody>
            {maintenances.map((maintenance) => (
              <tr key={maintenance._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{maintenance.vehicle?.number}</td>
                <td className="py-3 px-4">{maintenance.type === 'preventive' ? 'Preventiva' : 'Corretiva'}</td>
                <td className="py-3 px-4">{maintenance.description}</td>
                <td className="py-3 px-4">{new Date(maintenance.scheduledDate).toLocaleDateString('pt-BR')}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(maintenance.status)}`}>
                    {getStatusBadge(maintenance.status)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    maintenance.priority === 'high' ? 'bg-red-100 text-red-800' :
                    maintenance.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {maintenance.priority === 'high' ? 'Alta' : maintenance.priority === 'medium' ? 'Média' : 'Baixa'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};