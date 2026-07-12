import React, { useEffect, useState } from 'react';
import { reportService } from '../../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const KPIs = () => {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKPIs();
  }, []);

  const fetchKPIs = async () => {
    try {
      const res = await reportService.getKPIs();
      setKpis(res.data);
    } catch (error) {
      console.error('Erro ao carregar KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  const kpiData = [
    { month: 'Janeiro', availability: 85, mttr: 2.5 },
    { month: 'Fevereiro', availability: 88, mttr: 2.3 },
    { month: 'Março', availability: 82, mttr: 2.8 },
    { month: 'Abril', availability: 90, mttr: 2.1 },
    { month: 'Maio', availability: 87, mttr: 2.4 },
    { month: 'Junho', availability: 92, mttr: 2.0 },
  ];

  if (loading) return <div className="text-center py-12">Carregando...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-dark">Indicadores de Desempenho</h1>
        <p className="text-gray-500 mt-1">KPIs da frota</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Disponibilidade</h3>
          <p className="text-4xl font-bold text-green-600">{kpis?.availability || 0}%</p>
          <p className="text-xs text-gray-500 mt-2">Total de viaturas disponíveis</p>
        </div>
        <div className="card">
          <h3 className="text-gray-500 text-sm font-medium mb-2">MTTR (Horas)</h3>
          <p className="text-4xl font-bold text-blue-600">{kpis?.mttr || 0}</p>
          <p className="text-xs text-gray-500 mt-2">Tempo médio de reparo</p>
        </div>
        <div className="card">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total de Ordens</h3>
          <p className="text-4xl font-bold text-orange-600">{kpis?.totalServiceOrders || 0}</p>
          <p className="text-xs text-gray-500 mt-2">Ordens de serviço concluídas</p>
        </div>
        <div className="card">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total de Viaturas</h3>
          <p className="text-4xl font-bold text-purple-600">{kpis?.totalVehicles || 0}</p>
          <p className="text-xs text-gray-500 mt-2">Frota total</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold text-text-dark mb-4">Tendência de Indicadores</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={kpiData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="availability" stroke="#2ECC71" fill="#2ECC71" name="Disponibilidade (%)" />
            <Area type="monotone" dataKey="mttr" stroke="#3498DB" fill="#3498DB" name="MTTR (horas)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-bold text-text-dark mb-4">Eficiência da Frota</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600">Tempo de Parada Médio</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">4.5 horas</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Conformidade</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">92%</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfação com Manutenção</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-purple-600 h-2 rounded-full" style={{width: '88%'}}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">88%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-bold text-text-dark mb-4">Custo Operacional</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-600">Custo por Viatura/Mês</p>
              <p className="text-lg font-bold text-text-dark">R$ 850,00</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-600">Custo Total/Mês</p>
              <p className="text-lg font-bold text-text-dark">R$ 42.500,00</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-600">Economia YoY</p>
              <p className="text-lg font-bold text-green-600">+12.3%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};