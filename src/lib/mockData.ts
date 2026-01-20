// Mock data for SANGAM Command Center

export interface Asset {
  id: string;
  type: string;
  batch: string;
  origin: string;
  createdAt: string;
  lastEvent: string;
  location: { lat: number; lng: number };
  status: 'active' | 'pending' | 'alert';
}

export interface AssetEvent {
  id: number;
  assetId: string;
  type: 'REGISTERED' | 'DISPATCH' | 'CHECKPOINT' | 'RECEIVED' | 'INSPECTION' | 'TRANSFER';
  timestamp: string;
  location: string;
  operator: string;
  deviceId: string;
  signature: string;
  chainedTo: number | null;
  synced: boolean;
}

export interface MeshNode {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'syncing';
  lastSeen: string;
  eventsRelayed: number;
}

export interface Alert {
  id: string;
  type: 'tampering' | 'timestamp_anomaly' | 'chain_break' | 'sync_failure';
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  assetId?: string;
  resolved: boolean;
}

export const mockAssets: Asset[] = [
  {
    id: 'AST-2024-001',
    type: 'Ammunition Crate',
    batch: 'BATCH-7749',
    origin: 'Delhi Ordnance Factory',
    createdAt: '2024-01-15T08:30:00Z',
    lastEvent: 'CHECKPOINT',
    location: { lat: 28.6139, lng: 77.2090 },
    status: 'active'
  },
  {
    id: 'AST-2024-002',
    type: 'Medical Supplies',
    batch: 'BATCH-3321',
    origin: 'Mumbai Medical Depot',
    createdAt: '2024-01-16T10:15:00Z',
    lastEvent: 'DISPATCH',
    location: { lat: 19.0760, lng: 72.8777 },
    status: 'active'
  },
  {
    id: 'AST-2024-003',
    type: 'Communication Equipment',
    batch: 'BATCH-9912',
    origin: 'Bangalore Electronics',
    createdAt: '2024-01-17T14:45:00Z',
    lastEvent: 'RECEIVED',
    location: { lat: 12.9716, lng: 77.5946 },
    status: 'pending'
  },
  {
    id: 'AST-2024-004',
    type: 'Fuel Containers',
    batch: 'BATCH-5567',
    origin: 'Chennai Petroleum',
    createdAt: '2024-01-18T06:00:00Z',
    lastEvent: 'INSPECTION',
    location: { lat: 13.0827, lng: 80.2707 },
    status: 'alert'
  },
  {
    id: 'AST-2024-005',
    type: 'Ration Supplies',
    batch: 'BATCH-1123',
    origin: 'Kolkata Supply Depot',
    createdAt: '2024-01-19T09:30:00Z',
    lastEvent: 'TRANSFER',
    location: { lat: 22.5726, lng: 88.3639 },
    status: 'active'
  },
  {
    id: 'AST-2024-006',
    type: 'Vehicle Parts',
    batch: 'BATCH-8834',
    origin: 'Pune Manufacturing',
    createdAt: '2024-01-20T11:20:00Z',
    lastEvent: 'CHECKPOINT',
    location: { lat: 18.5204, lng: 73.8567 },
    status: 'active'
  }
];

export const mockEvents: Record<string, AssetEvent[]> = {
  'AST-2024-001': [
    { id: 1, assetId: 'AST-2024-001', type: 'REGISTERED', timestamp: '2024-01-15T08:30:00Z', location: 'Delhi Ordnance Factory', operator: 'OPR-101', deviceId: 'DEV-ALPHA-01', signature: '0x7f3a8b2c...d9e1', chainedTo: null, synced: true },
    { id: 2, assetId: 'AST-2024-001', type: 'DISPATCH', timestamp: '2024-01-15T12:00:00Z', location: 'Delhi Transit Hub', operator: 'OPR-102', deviceId: 'DEV-ALPHA-01', signature: '0x9c4d7e1f...a3b2', chainedTo: 1, synced: true },
    { id: 3, assetId: 'AST-2024-001', type: 'CHECKPOINT', timestamp: '2024-01-16T06:30:00Z', location: 'Jaipur Checkpoint', operator: 'OPR-205', deviceId: 'DEV-BETA-03', signature: '0x2b8f4a7c...e6d5', chainedTo: 2, synced: true },
    { id: 4, assetId: 'AST-2024-001', type: 'CHECKPOINT', timestamp: '2024-01-17T14:15:00Z', location: 'Jodhpur Forward Base', operator: 'OPR-312', deviceId: 'DEV-GAMMA-02', signature: '0x5e9c1d3a...f8g7', chainedTo: 3, synced: false }
  ],
  'AST-2024-002': [
    { id: 1, assetId: 'AST-2024-002', type: 'REGISTERED', timestamp: '2024-01-16T10:15:00Z', location: 'Mumbai Medical Depot', operator: 'OPR-401', deviceId: 'DEV-DELTA-01', signature: '0x1a2b3c4d...5e6f', chainedTo: null, synced: true },
    { id: 2, assetId: 'AST-2024-002', type: 'DISPATCH', timestamp: '2024-01-16T16:00:00Z', location: 'Mumbai Airport', operator: 'OPR-402', deviceId: 'DEV-DELTA-01', signature: '0x7g8h9i0j...1k2l', chainedTo: 1, synced: true }
  ],
  'AST-2024-004': [
    { id: 1, assetId: 'AST-2024-004', type: 'REGISTERED', timestamp: '2024-01-18T06:00:00Z', location: 'Chennai Petroleum', operator: 'OPR-501', deviceId: 'DEV-EPSILON-01', signature: '0xa1b2c3d4...e5f6', chainedTo: null, synced: true },
    { id: 2, assetId: 'AST-2024-004', type: 'DISPATCH', timestamp: '2024-01-18T10:30:00Z', location: 'Chennai Port', operator: 'OPR-502', deviceId: 'DEV-EPSILON-02', signature: '0xg7h8i9j0...k1l2', chainedTo: 1, synced: true },
    { id: 3, assetId: 'AST-2024-004', type: 'INSPECTION', timestamp: '2024-01-19T08:00:00Z', location: 'Vizag Naval Base', operator: 'OPR-601', deviceId: 'DEV-ZETA-01', signature: '0xm3n4o5p6...q7r8', chainedTo: 2, synced: true }
  ]
};

export const mockMeshNodes: MeshNode[] = [
  { id: 'node-1', name: 'DEVICE-ALPHA', status: 'online', lastSeen: '2024-01-20T12:00:00Z', eventsRelayed: 1247 },
  { id: 'node-2', name: 'DEVICE-BETA', status: 'online', lastSeen: '2024-01-20T11:58:00Z', eventsRelayed: 892 },
  { id: 'node-3', name: 'DEVICE-GAMMA', status: 'syncing', lastSeen: '2024-01-20T11:55:00Z', eventsRelayed: 456 },
  { id: 'node-4', name: 'DEVICE-DELTA', status: 'online', lastSeen: '2024-01-20T11:59:00Z', eventsRelayed: 2103 },
  { id: 'node-5', name: 'DEVICE-EPSILON', status: 'offline', lastSeen: '2024-01-20T08:30:00Z', eventsRelayed: 334 },
  { id: 'node-6', name: 'DEVICE-ZETA', status: 'online', lastSeen: '2024-01-20T12:00:00Z', eventsRelayed: 567 }
];

export const mockAlerts: Alert[] = [
  { id: 'alert-1', type: 'tampering', severity: 'critical', message: 'Potential tampering detected on AST-2024-004: Timestamp anomaly in event chain', timestamp: '2024-01-20T11:45:00Z', assetId: 'AST-2024-004', resolved: false },
  { id: 'alert-2', type: 'sync_failure', severity: 'warning', message: 'DEVICE-EPSILON offline for 3+ hours', timestamp: '2024-01-20T11:30:00Z', resolved: false },
  { id: 'alert-3', type: 'chain_break', severity: 'warning', message: 'Chain verification pending for AST-2024-001 event #4', timestamp: '2024-01-20T10:15:00Z', assetId: 'AST-2024-001', resolved: false },
  { id: 'alert-4', type: 'timestamp_anomaly', severity: 'info', message: 'Minor clock drift detected on DEVICE-GAMMA (corrected)', timestamp: '2024-01-20T09:00:00Z', resolved: true }
];

export const eventTypeIcons: Record<string, string> = {
  'REGISTERED': '📋',
  'DISPATCH': '📦',
  'CHECKPOINT': '🛂',
  'RECEIVED': '✅',
  'INSPECTION': '🔍',
  'TRANSFER': '🔄'
};

export const eventDistribution = [
  { type: 'REGISTERED', count: 24 },
  { type: 'DISPATCH', count: 18 },
  { type: 'CHECKPOINT', count: 45 },
  { type: 'RECEIVED', count: 12 },
  { type: 'INSPECTION', count: 8 },
  { type: 'TRANSFER', count: 6 }
];
