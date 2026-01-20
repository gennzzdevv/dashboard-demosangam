import { Radio, Wifi, WifiOff, RefreshCw, Activity } from 'lucide-react';
import { mockMeshNodes, MeshNode } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const MeshNetwork = () => {
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getStatusIcon = (status: MeshNode['status']) => {
    switch (status) {
      case 'online':
        return <Wifi className="h-4 w-4 text-primary" />;
      case 'syncing':
        return <RefreshCw className="h-4 w-4 text-warning animate-spin" />;
      case 'offline':
        return <WifiOff className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: MeshNode['status']) => {
    switch (status) {
      case 'online':
        return <span className="text-primary">Online</span>;
      case 'syncing':
        return <span className="text-warning">Syncing</span>;
      case 'offline':
        return <span className="text-muted-foreground">Offline</span>;
    }
  };

  const onlineCount = mockMeshNodes.filter(n => n.status === 'online').length;
  const syncingCount = mockMeshNodes.filter(n => n.status === 'syncing').length;
  const offlineCount = mockMeshNodes.filter(n => n.status === 'offline').length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="command-panel p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
              <Wifi className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="data-label">Nodes Online</p>
              <p className="text-2xl font-bold font-mono text-primary">{onlineCount}</p>
            </div>
          </div>
        </div>

        <div className="command-panel p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-warning/10 flex items-center justify-center">
              <RefreshCw className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="data-label">Syncing</p>
              <p className="text-2xl font-bold font-mono text-warning">{syncingCount}</p>
            </div>
          </div>
        </div>

        <div className="command-panel p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
              <WifiOff className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="data-label">Offline</p>
              <p className="text-2xl font-bold font-mono">{offlineCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Node List */}
      <div className="command-panel">
        <div className="command-header">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-primary" />
            <span className="font-medium">Mesh Network Nodes</span>
          </div>
          <span className="text-xs text-muted-foreground">{mockMeshNodes.length} devices</span>
        </div>

        <div className="divide-y divide-border">
          {mockMeshNodes.map((node) => (
            <div 
              key={node.id}
              className={cn(
                "p-4 flex items-center justify-between",
                node.status === 'offline' && "opacity-60"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "h-10 w-10 rounded-md flex items-center justify-center",
                  node.status === 'online' ? "bg-primary/10" : 
                  node.status === 'syncing' ? "bg-warning/10" : "bg-muted"
                )}>
                  {getStatusIcon(node.status)}
                </div>
                <div>
                  <p className="font-mono font-medium">{node.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>ID: {node.id}</span>
                    <span>•</span>
                    <span>Last seen: {formatTime(node.lastSeen)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="data-label">Events Relayed</p>
                  <p className="font-mono text-lg">{node.eventsRelayed.toLocaleString()}</p>
                </div>
                <div className="w-20 text-right">
                  <p className="data-label">Status</p>
                  <p className="font-medium">{getStatusText(node.status)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Network Activity */}
      <div className="command-panel">
        <div className="command-header">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="font-medium">Recent Network Activity</span>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-2 font-mono text-sm">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">12:00:15</span>
              <span className="text-primary">DEVICE-ALPHA</span>
              <span className="text-muted-foreground">→</span>
              <span>Relayed event #4521 to DEVICE-BETA</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">11:59:48</span>
              <span className="text-primary">DEVICE-DELTA</span>
              <span className="text-muted-foreground">→</span>
              <span>Synced 12 pending events to blockchain</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">11:58:22</span>
              <span className="text-warning">DEVICE-GAMMA</span>
              <span className="text-muted-foreground">→</span>
              <span>Started sync (23 events pending)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">11:55:10</span>
              <span className="text-primary">DEVICE-ZETA</span>
              <span className="text-muted-foreground">→</span>
              <span>Received event #4520 from mesh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeshNetwork;
