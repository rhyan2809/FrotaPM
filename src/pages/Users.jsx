import React, { useEffect, useState } from 'react';
import { userService } from '../../services/api';
import { Plus, Edit, Trash2, Lock } from 'lucide-react';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await userService.getAll();
      setUsers(res.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    const roles = {
      admin: { label: 'Administrador', color: 'bg-red-100 text-red-800' },
      manager: { label: 'Gerente', color: 'bg-blue-100 text-blue-800' },
      mechanic: { label: 'Mecânico', color: 'bg-orange-100 text-orange-800' },
      officer: { label: 'Policial', color: 'bg-green-100 text-green-800' },
    };
    const r = roles[role] || { label: role, color: 'bg-gray-100 text-gray-800' };
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${r.color}`}>{r.label}</span>;
  };

  if (loading) return <div className="text-center py-12">Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-dark">Usuários</h1>
          <p className="text-gray-500 mt-1">Gerenciamento de usuários e permissões</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Novo Usuário
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Nome</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Cargo</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Unidade</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Último Acesso</th>
              <th className="text-left py-3 px-4 font-semibold text-text-dark">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.photo || 'https://via.placeholder.com/40'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">{user.email}</td>
                <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                <td className="py-3 px-4">{user.unit}</td>
                <td className="py-3 px-4 text-sm">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('pt-BR') : 'Nunca'}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <Lock size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
