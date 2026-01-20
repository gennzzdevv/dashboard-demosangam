import { AlertTriangle, ShieldAlert, Clock, Link2Off, WifiOff, CheckCircle } from 'lucide-react';
import { mockAlerts, Alert } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Alerts = () => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'tampering':
        return <ShieldAlert className="h-5 w-5" />;
      case 'timestamp_anomaly':
        return <Clock className="h-5 w-5" />;
      case 'chain_break':
        return <Link2Off className="h-5 w-5" />;
      case 'sync_failure':
        return <WifiOff className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-destructive/50 bg-destructive/5';
      case 'warning':
        return 'border-warning/50 bg-warning/5';
      case 'info':
        return 'border-muted-foreground/30 bg-muted/30';
    }
  };

  const getSeverityIconColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'text-destructive';
      case 'warning':
        return 'text-warning';
      case 'info':
        return 'text-muted-foreground';
    }
  };

  const getSeverityBadge = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded text-xs font-medium bg-destructive/20 text-destructive uppercase">Critical</span>;
      case 'warning':
        return <span className="px-2 py-0.5 rounded text-xs font-medium bg-warning/20 text-warning uppercase">Warning</span>;
      case 'info':
        return <span className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground uppercase">Info</span>;
    }
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const activeAlerts = mockAlerts.filter(a => !a.resolved);
  const resolvedAlerts = mockAlerts.filter(a => a.resolved);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="command-panel p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="data-label">Critical Alerts</p>
              <p className="text-2xl font-bold font-mono text-destructive">
                {activeAlerts.filter(a => a.severity === 'critical').length}
              </p>
            </div>
          </div>
        </div>

        <div className="command-panel p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="data-label">Warnings</p>
              <p className="text-2xl font-bold font-mono text-warning">
                {activeAlerts.filter(a => a.severity === 'warning').length}
              </p>
            </div>
          </div>
        </div>

        <div className="command-panel p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="data-label">Resolved Today</p>
              <p className="text-2xl font-bold font-mono text-primary">{resolvedAlerts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="command-panel">
        <div className="command-header">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <span className="font-medium">Active Alerts ({activeAlerts.length})</span>
          </div>
        </div>

        {activeAlerts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-primary opacity-50" />
            <p>No active alerts</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activeAlerts.map((alert) => (
              <div 
                key={alert.id}
                className={cn(
                  "p-4 border-l-4",
                  getSeverityColor(alert.severity)
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn("mt-0.5", getSeverityIconColor(alert.severity))}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getSeverityBadge(alert.severity)}
                      <span className="text-xs text-muted-foreground font-mono">
                        {formatDateTime(alert.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{alert.message}</p>
                    {alert.assetId && (
                      <p className="text-xs text-muted-foreground">
                        Related Asset: <span className="font-mono text-primary">{alert.assetId}</span>
                      </p>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    Investigate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <div className="command-panel opacity-60">
          <div className="command-header">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">Resolved ({resolvedAlerts.length})</span>
            </div>
          </div>

          <div className="divide-y divide-border">
            {resolvedAlerts.map((alert) => (
              <div key={alert.id} className="p-4 flex items-center gap-4">
                <CheckCircle className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground line-through">{alert.message}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    {formatDateTime(alert.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;
