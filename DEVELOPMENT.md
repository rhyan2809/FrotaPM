# FrotaPM - Instruções de Desenvolvimento

## 🚀 Começando

### Pré-requisitos
- Node.js 16+
- MongoDB 4.4+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Editar .env com suas configurações
```

### Desenvolvimento

```bash
# Iniciar servidor e cliente simultaneamente
npm run dev

# Ou iniciar separadamente:
npm run dev:server  # Terminal 1
npm run dev:client  # Terminal 2
```

Acesse:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

## 📁 Estrutura do Projeto

```
FrotaPM/
├── server/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Vehicle.js
│   │   ├── Maintenance.js
│   │   ├── ServiceOrder.js
│   │   └── Tracking.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── vehicle.routes.js
│   │   ├── maintenance.routes.js
│   │   ├── serviceOrder.routes.js
│   │   ├── tracking.routes.js
│   │   ├── report.routes.js
│   │   └── user.routes.js
│   └── index.js
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   │   └── cards/
│   │       └── StatCard.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Vehicles.jsx
│   │   ├── Maintenance.jsx
│   │   ├── ServiceOrders.jsx
│   │   ├── History.jsx
│   │   ├── Tracking.jsx
│   │   ├── KPIs.jsx
│   │   ├── Reports.jsx
│   │   ├── Users.jsx
│   │   ├── Settings.jsx
│   │   └── Login.jsx
│   ├── services/
│   │   └── api.js
│   ├── stores/
│   │   └── index.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🔐 Credenciais de Teste

Crie um usuário de teste via POST `/api/auth/register`:

```json
{
  "name": "Admin",
  "email": "admin@test.com",
  "password": "123456",
  "role": "admin",
  "unit": "Blumenau"
}
```

Login com:
```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

## 🎨 Design System

### Paleta de Cores
- **Navy**: #0D1B2A
- **Navy Light**: #1B4F72
- **Gold**: #F4C430
- **Success**: #2ECC71
- **Warning**: #F39C12
- **Error**: #E74C3C
- **Background**: #F5F7FA

### Componentes Disponíveis
- `StatCard` - Cards de estatísticas
- `Layout` - Layout principal com sidebar
- `Header` - Cabeçalho com notificações
- `Sidebar` - Menu lateral
- Tabelas com Tailwind
- Gráficos com Recharts
- Mapas com Leaflet

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar
- `POST /api/auth/login` - Login

### Viaturas
- `GET /api/vehicles` - Listar
- `GET /api/vehicles/:id` - Detalhe
- `POST /api/vehicles` - Criar
- `PUT /api/vehicles/:id` - Atualizar
- `DELETE /api/vehicles/:id` - Deletar

### Manutenção
- `GET /api/maintenance` - Listar
- `GET /api/maintenance/vehicle/:vehicleId` - Por viatura
- `POST /api/maintenance` - Criar
- `PUT /api/maintenance/:id` - Atualizar

### Ordens de Serviço
- `GET /api/service-orders` - Listar
- `POST /api/service-orders` - Criar
- `PUT /api/service-orders/:id` - Atualizar

### Rastreamento
- `GET /api/tracking` - Atual
- `GET /api/tracking/vehicle/:vehicleId` - Histórico
- `POST /api/tracking` - Criar

### Relatórios
- `GET /api/reports/availability` - Disponibilidade
- `GET /api/reports/costs` - Custos
- `GET /api/reports/kpis` - KPIs

### Usuários
- `GET /api/users` - Listar
- `POST /api/users` - Criar
- `PUT /api/users/:id` - Atualizar
- `DELETE /api/users/:id` - Deletar

## 🚢 Build & Deploy

```bash
# Build para produção
npm run build

# Preview da build
npm run preview

# Executar servidor em produção
npm start
```

## 📝 Commits

Siga o padrão:
```
feat: nova funcionalidade
fix: correção de bug
docs: atualização de documentação
style: formatação
refactor: refatoração
test: testes
chore: manutenção
```

## 🔧 Troubleshooting

### MongoDB não conecta
- Verificar se MongoDB está rodando: `mongod`
- Verificar `MONGODB_URI` em `.env`

### Porta 5000 já em uso
- Mudar porta em `.env`: `PORT=5001`

### Leaflet não funciona
- Icons já são corrigidos no código
- Se ainda tiver problema, verificar console de erros

## 📞 Suporte

Para dúvidas, abra uma issue no GitHub.

Bom desenvolvimento! 🚀