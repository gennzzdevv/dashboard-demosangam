import { Package, Activity, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatsBarProps {
  totalAssets: number;
  totalEvents: number;
}

export function StatsBar({ totalAssets, totalEvents }: StatsBarProps) {
  const [lastSync, setLastSync] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="command-panel">
        <div className="p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="data-label">Total Assets</p>
            <p className="text-2xl font-bold font-mono">{totalAssets}</p>
          </div>
        </div>
      </div>

      <div className="command-panel">
        <div className="p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="data-label">Total Events</p>
            <p className="text-2xl font-bold font-mono">{totalEvents}</p>
          </div>
        </div>
      </div>

      <div className="command-panel">
        <div className="p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
            <RefreshCw className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="data-label">Last Sync</p>
            <p className="text-2xl font-bold font-mono">{formatTime(lastSync)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
