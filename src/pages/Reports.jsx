import React, { useEffect, useState } from 'react';
import { reportService } from '../../services/api';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText } from 'lucide-react';

export const Reports = () => {
  const [costs, setCosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await reportService.getCosts();
      setCosts(res.data);
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    alert(`Exportando em ${format}...`);
  };

  const costData = [
    { name: 'Janeiro', maintenance: 1500, service: 2000 },
    { name: 'Fevereiro', maintenance: 1200, service: 1800 },
    { name: 'Março', maintenance: 1800, service: 2200 },
    { name: 'Abril', maintenance: 2000, service: 2500 },
    { name: 'Maio', maintenance: 1600, service: 2100 },
    { name: 'Junho', maintenance: 2200, service: 2800 },
  ];

  if (loading) return <div className="text-center py-12">Carregando...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-dark">Relatórios</h1>
        <p className="text-gray-500 mt-1">Análise de manutenção e custos</p>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold text-text-dark mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">Data Inicial</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">Data Final</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex items-end gap-2">
            <button className="btn-primary w-full">Gerar Relatório</button>
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={() => handleExport('PDF')}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <Download size={18} />
              PDF
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Manutenção Preventiva</h3>
          <p className="text-2xl font-bold text-text-dark">
            R$ {(costs?.maintenanceCost || 0).toFixed(2)}
          </p>
        </div>
        <div className="card">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Ordens de Serviço</h3>
          <p className="text-2xl font-bold text-text-dark">
            R$ {(costs?.serviceCost || 0).toFixed(2)}
          </p>
        </div>
        <div className="card bg-navy text-white">
          <h3 className="text-gray-300 text-sm font-medium mb-2">Custo Total</h3>
          <p className="text-2xl font-bold">
            R$ {(costs?.totalCost || 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold text-text-dark mb-4">Custos por Mês</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={costData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="maintenance" fill="#1B4F72" name="Manutenção" />
            <Bar dataKey="service" fill="#F39C12" name="Serviço" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold text-text-dark mb-4">Ações de Relatório</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-primary flex items-center gap-2 justify-center">
            <FileText size={20} />
            Manutenções Vencidas
          </button>
          <button className="btn-primary flex items-center gap-2 justify-center">
            <FileText size={20} />
            Disponibilidade da Frota
          </button>
          <button className="btn-primary flex items-center gap-2 justify-center">
            <FileText size={20} />
            Histórico por Viatura
          </button>
        </div>
      </div>
    </div>
  );
};