import React, { useEffect, useState } from 'react';
import { serviceOrderService } from '../../services/api';
import { Plus, Printer } from 'lucide-react';

export const ServiceOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceOrders();
  }, []);

  const fetchServiceOrders = async () => {
    try {
      const res = await serviceOrderService.getAll();
      setOrders(res.data);
    } catch (error) {
      console.error('Erro ao carregar ordens de serviço:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statuses = {
      open: { label: 'Aberta', color: 'bg-blue-100 text-blue-800' },
      in_progress: { label: 'Em andamento', color: 'bg-orange-100 text-orange-800' },
      completed: { label: 'Concluída', color: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Cancelada', color: 'bg-gray-100 text-gray-800' },
    };
    const s = statuses[status] || { label: status, color: 'bg-gray-100' };
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${s.color}`}>{s.label}</span>;
  };

  if (loading) return <div className="text-center py-12">Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-dark">Ordens de Serviço</h1>
          <p className="text-gray-500 mt-1">Gerenciamento de ordens de serviço</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nova Ordem
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Número</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Viatura</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Problema</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Responsável</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Custo</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{order.orderNumber}</td>
                <td className="py-3 px-4">{order.vehicle?.number}</td>
                <td className="py-3 px-4">{order.problemDescription}</td>
                <td className="py-3 px-4">{order.responsible?.name}</td>
                <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                <td className="py-3 px-4 font-semibold">
                  R$ {(order.totalCost || 0).toFixed(2)}
                </td>
                <td className="py-3 px-4">
                  <button className="p-2 hover:bg-gray-200 rounded-lg">
                    <Printer size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};