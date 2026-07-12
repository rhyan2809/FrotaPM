import React, { useState, useEffect } from 'react';
import { maintenanceService } from '../../services/api';
import { Calendar, AlertCircle } from 'lucide-react';

export const History = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaintenanceHistory();
  }, []);

  const fetchMaintenanceHistory = async () => {
    try {
      const res = await maintenanceService.getAll();
      setMaintenances(res.data.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate)));
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Carregando...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-dark">Histórico de Manutenção</h1>
        <p className="text-gray-500 mt-1">Registro completo de serviços realizados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total de Manutenções</h3>
          <p className="text-3xl font-bold text-text-dark">{maintenances.length}</p>
        </div>
        <div className="card">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Manutenções Concluídas</h3>
          <p className="text-3xl font-bold text-text-dark">
            {maintenances.filter(m => m.status === 'completed').length}
          </p>
        </div>
        <div className="card">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Custo Total</h3>
          <p className="text-3xl font-bold text-text-dark">
            R$ {maintenances.reduce((sum, m) => sum + (m.totalCost || 0), 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {maintenances.map((maintenance) => (
          <div key={maintenance._id} className="card">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  maintenance.status === 'completed' ? 'bg-green-100' :
                  maintenance.status === 'in_progress' ? 'bg-orange-100' :
                  'bg-blue-100'
                }`}>
                  {maintenance.status === 'completed' ? '✅' : 
                   maintenance.status === 'in_progress' ? '⏳' : 
                   '📅'}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-text-dark">{maintenance.vehicle?.number}</h3>
                    <p className="text-sm text-gray-600">{maintenance.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text-dark">
                      R$ {(maintenance.totalCost || 0).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {maintenance.completedDate ? new Date(maintenance.completedDate).toLocaleDateString('pt-BR') : 'Pendente'}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {maintenance.parts?.map((part, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {part.name} (x{part.quantity})
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <p>Tempo de parada: {maintenance.downtime || 0} minutos</p>
                  <p>Responsável: {maintenance.responsible?.name || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};